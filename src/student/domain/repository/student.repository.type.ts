import { Repository } from "../../../utils";
import { StudentForgotPasswordEventValueObject, StudentWelcomeEventValueObject } from "../value-object";


export abstract class StudentRepository extends Repository {

	abstract sendForgotPasswordEmail(
		studentForgotPasswordEventValueObject:
			StudentForgotPasswordEventValueObject
	): Promise<void>;

	abstract sendWelcomeEmail(
		studentWelcomeEventValueObject: StudentWelcomeEventValueObject
	): Promise<void>;
}