import { UseCase } from "../../../utils";
import { ProcessStudentWelcomEmailEventRequestDTO } from "../dto";


export abstract class ProcessStudentWelcomeEmailEventUsecase implements
	UseCase {
	abstract set processStudentWelcomEmailEventRequestDTO(
		processStudentWelcomEmailEventRequestDTO:
			ProcessStudentWelcomEmailEventRequestDTO
	);

	abstract execute(): Promise<void>;
}