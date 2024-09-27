import { UseCase } from "../../../utils";
import { ProcessInstructorWelcomEmailEventRequestDTO } from "../dto";


export abstract class ProcessInstructorWelcomeEmailEventUsecase implements
	UseCase {
	abstract set processInstructorWelcomEmailEventRequestDTO(
		processInstructorWelcomEmailEventRequestDTO:
			ProcessInstructorWelcomEmailEventRequestDTO
	);

	abstract execute(): Promise<void>;
}