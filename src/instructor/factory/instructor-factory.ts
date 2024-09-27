import { ErrorCodes, Factory, GenericError } from "../../utils";
import { ProcessInstructorWelcomeEmailEventUsecaseImpl } from "../application";
import { InstructorObject } from "../domain";
import { InstructorRepositoryImpl } from "../infrastructure";


class InstructorFactory implements Factory {

	private _objects: string[] = [
		"InstructorRepository",
		"ProcessInstructorWelcomeEmailEventUsecase"
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	make(objectName: string): InstructorObject {

		if (objectName === "InstructorRepository")
			return new InstructorRepositoryImpl();

		if (objectName === "ProcessInstructorWelcomeEmailEventUsecase")
			return new ProcessInstructorWelcomeEmailEventUsecaseImpl();

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
	InstructorFactory
};