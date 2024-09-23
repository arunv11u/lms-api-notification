import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ErrorCodes, GenericError } from "../../../utils";
import { StudentForgotPasswordEventValueObject, StudentRepository, StudentWelcomeEventValueObject } from "../../domain";
import { EmailRegistryRepositoryImpl, EmailRepositoryImpl } from "../../../email";



export class StudentRepositoryImpl implements StudentRepository {

	private _mongoDBRepository: MongoDBRepository | null = null;

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongoDBRepository = mongoDBRepository;
	}

	async sendForgotPasswordEmail(
		studentForgotPasswordEventValueObject:
			StudentForgotPasswordEventValueObject
	): Promise<void> {
		if (!this._mongoDBRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRepository = new EmailRepositoryImpl();
		const emailRegistryRepository =
			new EmailRegistryRepositoryImpl(
				this._mongoDBRepository
			);

		await emailRegistryRepository
			.saveForgotPasswordEmailForStudentEvent(
				studentForgotPasswordEventValueObject.id,
				studentForgotPasswordEventValueObject.userId,
				studentForgotPasswordEventValueObject.email,
				studentForgotPasswordEventValueObject.version
			);

		await emailRepository.sendForgotPasswordEmailForStudent(
			studentForgotPasswordEventValueObject.firstName,
			studentForgotPasswordEventValueObject.email,
			studentForgotPasswordEventValueObject.verificationCode
		);
	}

	async sendWelcomeEmail(
		studentWelcomeEventValueObject: StudentWelcomeEventValueObject
	): Promise<void> {
		if (!this._mongoDBRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRepository = new EmailRepositoryImpl();
		const emailRegistryRepository =
			new EmailRegistryRepositoryImpl(
				this._mongoDBRepository
			);

		await emailRegistryRepository
			.saveWelcomeEmailForStudentEvent(
				studentWelcomeEventValueObject.id,
				studentWelcomeEventValueObject.userId,
				studentWelcomeEventValueObject.email,
				studentWelcomeEventValueObject.version
			);

		await emailRepository.sendWelcomeEmailForStudent(
			studentWelcomeEventValueObject.firstName,
			studentWelcomeEventValueObject.email
		);
	}
}