import { Repository } from "../../../utils";
import { StudentForgotPasswordValueObject } from "../value-object";


export abstract class StudentRepository extends Repository {
	
	abstract sendForgotPasswordEmail(
		studentForgotPasswordValueObject: StudentForgotPasswordValueObject
	): Promise<void>;
}