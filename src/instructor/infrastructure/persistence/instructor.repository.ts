import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ErrorCodes, GenericError } from "../../../utils";
import { EmailRegistryRepositoryImpl, EmailRepositoryImpl } from "../../../email";
import {
	InstructorForgotPasswordEventValueObject,
	InstructorRepository,
	InstructorWelcomeEventValueObject
} from "../../domain";



export class InstructorRepositoryImpl implements InstructorRepository {

	private _mongoDBRepository: MongoDBRepository | null = null;

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongoDBRepository = mongoDBRepository;
	}

	async sendForgotPasswordEmail(
		instructorForgotPasswordEventValueObject:
			InstructorForgotPasswordEventValueObject
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
			.saveForgotPasswordEmailForInstructorEvent(
				instructorForgotPasswordEventValueObject.id,
				instructorForgotPasswordEventValueObject.userId,
				instructorForgotPasswordEventValueObject.email,
				instructorForgotPasswordEventValueObject.version
			);

		await emailRepository.sendForgotPasswordEmailForInstructor(
			instructorForgotPasswordEventValueObject.firstName,
			instructorForgotPasswordEventValueObject.email,
			instructorForgotPasswordEventValueObject.verificationCode
		);
	}

	async sendWelcomeEmail(
		instructorWelcomeEventValueObject: InstructorWelcomeEventValueObject
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
			.saveWelcomeEmailForInstructorEvent(
				instructorWelcomeEventValueObject.id,
				instructorWelcomeEventValueObject.userId,
				instructorWelcomeEventValueObject.email,
				instructorWelcomeEventValueObject.version
			);

		await emailRepository.sendWelcomeEmailForInstructor(
			instructorWelcomeEventValueObject.firstName,
			instructorWelcomeEventValueObject.email
		);
	}


}