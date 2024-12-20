import { ErrorCodes, Factory, GenericError } from "../../utils";
import {
	PublishCourseTranscodingCompletedEventUseCaseImpl,
	PublishStripeCheckoutCompletedEventUseCaseImpl
} from "../application";
import { CourseObject } from "../domain";
import { CourseRepositoryImpl } from "../infrastructure";


class CourseFactory implements Factory {

	private _objects: string[] = [
		"CourseRepository",
		"PublishCourseTranscodingCompletedEventUseCase",
		"PublishStripeCheckoutCompletedEventUseCase"
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	make(objectName: string): CourseObject {

		if (objectName === "CourseRepository")
			return new CourseRepositoryImpl();

		if (objectName === "PublishCourseTranscodingCompletedEventUseCase")
			return new PublishCourseTranscodingCompletedEventUseCaseImpl();

		if (objectName === "PublishStripeCheckoutCompletedEventUseCase")
			return new PublishStripeCheckoutCompletedEventUseCaseImpl();

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
	CourseFactory
};