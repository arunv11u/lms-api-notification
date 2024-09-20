import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { ErrorCodes, GenericError, UserTypes } from "../../../utils";
import { ForgotPasswordRegistryORMEntity } from "./forgot-password-registry.orm-entity";



class ForgotPasswordRegistryRepositoryImpl {
	private _collectionName = "forgot-password-registry";
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

		const forgotPasswordRegistryORMEntity = await this._mongodbRepository
			.get<ForgotPasswordRegistryORMEntity>(
				this._collectionName,
				id
			);

		if (forgotPasswordRegistryORMEntity)
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

		const forgotPasswordRegistryORMEntity =
			new ForgotPasswordRegistryORMEntity();

		forgotPasswordRegistryORMEntity._id = id;
		forgotPasswordRegistryORMEntity.email = email;
		forgotPasswordRegistryORMEntity.userId = userId;
		forgotPasswordRegistryORMEntity.userType = UserTypes.student;
		forgotPasswordRegistryORMEntity.version = version;

		await this._mongodbRepository
			.add<ForgotPasswordRegistryORMEntity>(
				this._collectionName,
				forgotPasswordRegistryORMEntity
			);
	}
}

export {
	ForgotPasswordRegistryRepositoryImpl
};