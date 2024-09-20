import { UseCase } from "../../../utils";
import { SendForgotPasswordEmailForStudentEventRequestDTO } from "../dto";


export abstract class SendForgotPasswordEmailForStudentEventUseCase implements
	UseCase {
	abstract set sendForgotPasswordEmailForStudentEventRequestDTO(
		sendForgotPasswordEmailForStudentEventRequestDTO:
			SendForgotPasswordEmailForStudentEventRequestDTO
	);

	abstract execute(): Promise<void>;
}