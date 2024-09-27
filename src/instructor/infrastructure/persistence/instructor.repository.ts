import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ErrorCodes, GenericError } from "../../../utils";
import { EmailRegistryRepositoryImpl, EmailRepositoryImpl } from "../../../email";
import {
	InstructorRepository,
	InstructorWelcomeEventValueObject
} from "../../domain";



export class InstructorRepositoryImpl implements InstructorRepository {

	private _mongoDBRepository: MongoDBRepository | null = null;

	set mongoDBRepository(mongoDBRepository: MongoDBRepository) {
		this._mongoDBRepository = mongoDBRepository;
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