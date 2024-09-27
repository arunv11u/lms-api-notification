import { Repository } from "../../../utils";
import { InstructorWelcomeEventValueObject } from "../value-object";


export abstract class InstructorRepository extends Repository {

	abstract sendWelcomeEmail(
		instructorWelcomeEventValueObject: InstructorWelcomeEventValueObject
	): Promise<void>;
}