import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { EmailTypes, ErrorCodes, GenericError, UserTypes } from "../../../utils";
import { EmailRegistryORMEntity } from "./email-registry.orm-entity";



class EmailRegistryRepositoryImpl {
	private _collectionName = "email-registry";
	private _mongodbRepository: MongoDBRepository | null = null;

	constructor(mongoDBRepository: MongoDBRepository) {
		this._mongodbRepository = mongoDBRepository;
	}

	async isForgotPasswordEmailForStudentExists(
		id: string
	): Promise<boolean> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRegistryORMEntity = await this._mongodbRepository
			.get<EmailRegistryORMEntity>(
				this._collectionName,
				id
			);

		if (emailRegistryORMEntity)
			return true;

		return false;
	}

	// eslint-disable-next-line max-params
	async saveForgotPasswordEmailForStudentEvent(
		id: string,
		userId: string,
		email: string,
		version: number
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRegistryORMEntity =
			new EmailRegistryORMEntity();

		emailRegistryORMEntity._id = id;
		emailRegistryORMEntity.email = email;
		emailRegistryORMEntity.emailType = EmailTypes.forgotPassword;
		emailRegistryORMEntity.userId = userId;
		emailRegistryORMEntity.userType = UserTypes.student;
		emailRegistryORMEntity.version = version;

		await this._mongodbRepository
			.add<EmailRegistryORMEntity>(
				this._collectionName,
				emailRegistryORMEntity
			);
	}

	async isWelcomeEmailForStudentExists(
		id: string
	): Promise<boolean> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRegistryORMEntity = await this._mongodbRepository
			.get<EmailRegistryORMEntity>(
				this._collectionName,
				id
			);

		if (emailRegistryORMEntity)
			return true;

		return false;
	}

	// eslint-disable-next-line max-params
	async saveWelcomeEmailForStudentEvent(
		id: string,
		userId: string,
		email: string,
		version: number
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRegistryORMEntity =
			new EmailRegistryORMEntity();

		emailRegistryORMEntity._id = id;
		emailRegistryORMEntity.email = email;
		emailRegistryORMEntity.emailType = EmailTypes.welcomEmail;
		emailRegistryORMEntity.userId = userId;
		emailRegistryORMEntity.userType = UserTypes.student;
		emailRegistryORMEntity.version = version;

		await this._mongodbRepository
			.add<EmailRegistryORMEntity>(
				this._collectionName,
				emailRegistryORMEntity
			);
	}

	// eslint-disable-next-line max-params
	async saveWelcomeEmailForInstructorEvent(
		id: string,
		userId: string,
		email: string,
		version: number
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRegistryORMEntity =
			new EmailRegistryORMEntity();

		emailRegistryORMEntity._id = id;
		emailRegistryORMEntity.email = email;
		emailRegistryORMEntity.emailType = EmailTypes.welcomEmail;
		emailRegistryORMEntity.userId = userId;
		emailRegistryORMEntity.userType = UserTypes.instructor;
		emailRegistryORMEntity.version = version;

		await this._mongodbRepository
			.add<EmailRegistryORMEntity>(
				this._collectionName,
				emailRegistryORMEntity
			);
	}

	async isForgotPasswordEmailForInstructorExists(
		id: string
	): Promise<boolean> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRegistryORMEntity = await this._mongodbRepository
			.get<EmailRegistryORMEntity>(
				this._collectionName,
				id
			);

		if (emailRegistryORMEntity)
			return true;

		return false;
	}

	// eslint-disable-next-line max-params
	async saveForgotPasswordEmailForInstructorEvent(
		id: string,
		userId: string,
		email: string,
		version: number
	): Promise<void> {
		if (!this._mongodbRepository)
			throw new GenericError({
				code: ErrorCodes.mongoDBRepositoryDoesNotExist,
				error: new Error("MongoDB repository does not exist"),
				errorCode: 500
			});

		const emailRegistryORMEntity =
			new EmailRegistryORMEntity();

		emailRegistryORMEntity._id = id;
		emailRegistryORMEntity.email = email;
		emailRegistryORMEntity.emailType = EmailTypes.forgotPassword;
		emailRegistryORMEntity.userId = userId;
		emailRegistryORMEntity.userType = UserTypes.instructor;
		emailRegistryORMEntity.version = version;

		await this._mongodbRepository
			.add<EmailRegistryORMEntity>(
				this._collectionName,
				emailRegistryORMEntity
			);
	}
}

export {
	EmailRegistryRepositoryImpl
};