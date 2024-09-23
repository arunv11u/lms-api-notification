import { UseCase } from "../../../utils";
import { ProcessStudentForgotPasswordEventRequestDTO } from "../dto";


export abstract class ProcessStudentForgotPasswordEventUseCase implements
	UseCase {
	abstract set processStudentForgotPasswordEventRequestDTO(
		processStudentForgotPasswordEventRequestDTO:
			ProcessStudentForgotPasswordEventRequestDTO
	);

	abstract execute(): Promise<void>;
}