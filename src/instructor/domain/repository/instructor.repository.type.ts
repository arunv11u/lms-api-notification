import { Repository } from "../../../utils";
import { 
	InstructorForgotPasswordEventValueObject, 
	InstructorWelcomeEventValueObject 
} from "../value-object";


export abstract class InstructorRepository extends Repository {

	abstract sendForgotPasswordEmail(
		instructorForgotPasswordEventValueObject:
			InstructorForgotPasswordEventValueObject
	): Promise<void>;

	abstract sendWelcomeEmail(
		instructorWelcomeEventValueObject: InstructorWelcomeEventValueObject
	): Promise<void>;
}