import { ErrorCodes, Factory, GenericError } from "../../utils";
import { ProcessStudentForgotPasswordEventUseCaseImpl, ProcessStudentWelcomeEmailEventUsecaseImpl } from "../application";
import { StudentObject } from "../domain";
import { StudentRepositoryImpl } from "../infrastructure";


class StudentFactory implements Factory {

	private _objects: string[] = [
		"StudentRepository",
		"ProcessStudentForgotPasswordEventUseCase",
		"ProcessStudentWelcomeEmailEventUsecase"
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	make(objectName: string): StudentObject {

		if (objectName === "StudentRepository")
			return new StudentRepositoryImpl();

		if (objectName === "ProcessStudentForgotPasswordEventUseCase")
			return new ProcessStudentForgotPasswordEventUseCaseImpl();

		if (objectName === "ProcessStudentWelcomeEmailEventUsecase")
			return new ProcessStudentWelcomeEmailEventUsecaseImpl();

		throw new GenericError({
			code: ErrorCodes.invalidFactoryObject,
			error: new Error("Requested object is invalid"),
			errorCode: 500
		});
	}

	getAll(): string[] {
		return this._objects;
	}
}

export {
	StudentFactory
};