import { UseCase } from "../../../utils";
import { ProcessInstructorForgotPasswordEventRequestDTO } from "../dto";


export abstract class ProcessInstructorForgotPasswordEventUseCase implements
	UseCase {
	abstract set processInstructorForgotPasswordEventRequestDTO(
		processInstructorForgotPasswordEventRequestDTO:
			ProcessInstructorForgotPasswordEventRequestDTO
	);

	abstract execute(): Promise<void>;
}