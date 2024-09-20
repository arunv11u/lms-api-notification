import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ForgotPasswordRegistryRepositoryImpl } from "../../../forgot-password-registry";
import { ErrorCodes, GenericError } from "../../../utils";
import { StudentForgotPasswordValueObject, StudentRepository } from "../../domain";
import { EmailRepositoryImpl } from "../../../email";



export class StudentRepositoryImpl implements StudentRepository {

	private _mongoDBRepository: MongoDBRepository | null = null;

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongoDBRepository = mongoDBRepository;
	}

	async sendForgotPasswordEmail(
		studentForgotPasswordValueObject: StudentForgotPasswordValueObject
	): Promise<void> {
		if (!this._mongoDBRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRepository = new EmailRepositoryImpl();
		const forgotPasswordRegistryRepository =
			new ForgotPasswordRegistryRepositoryImpl(
				this._mongoDBRepository
			);

		await forgotPasswordRegistryRepository
			.saveForgotPasswordEmailForStudentEvent(
				studentForgotPasswordValueObject.id,
				studentForgotPasswordValueObject.userId,
				studentForgotPasswordValueObject.email,
				studentForgotPasswordValueObject.version
			);

		await emailRepository.sendForgotPasswordEmailForStudent(
			studentForgotPasswordValueObject.firstName,
			studentForgotPasswordValueObject.email,
			studentForgotPasswordValueObject.verificationCode
		);
	}
}