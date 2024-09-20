import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { StudentForgotPasswordValueObject, StudentRepository } from "../../domain";
import { SendForgotPasswordEmailForStudentEventRequestDTO } from "../dto";
import { SendForgotPasswordEmailForStudentEventUseCase } from "./send-forgot-password-email-for-student-event.use-case.type";




export class SendForgotPasswordEmailForStudentEventUseCaseImpl implements
	SendForgotPasswordEmailForStudentEventUseCase {
	private _unitOfWork: UnitOfWork;
	private _sendForgotPasswordEmailForStudentEventRequestDTO:
		SendForgotPasswordEmailForStudentEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set sendForgotPasswordEmailForStudentEventRequestDTO(
		sendForgotPasswordEmailForStudentEventRequestDTO:
			SendForgotPasswordEmailForStudentEventRequestDTO
	) {
		this._sendForgotPasswordEmailForStudentEventRequestDTO =
			sendForgotPasswordEmailForStudentEventRequestDTO;
	}

	async execute(): Promise<void> {
		const studentRepository = this._unitOfWork
			.getRepository("StudentRepository") as StudentRepository;

		const studentForgotPasswordValueObject =
			new StudentForgotPasswordValueObject();
		studentForgotPasswordValueObject.email =
			this._sendForgotPasswordEmailForStudentEventRequestDTO.email;
		studentForgotPasswordValueObject.firstName =
			this._sendForgotPasswordEmailForStudentEventRequestDTO.firstName;
		studentForgotPasswordValueObject.id =
			this._sendForgotPasswordEmailForStudentEventRequestDTO.id;
		studentForgotPasswordValueObject.lastName =
			this._sendForgotPasswordEmailForStudentEventRequestDTO.lastName;
		studentForgotPasswordValueObject.userId =
			this._sendForgotPasswordEmailForStudentEventRequestDTO.userId;
		studentForgotPasswordValueObject.verificationCode =
			this._sendForgotPasswordEmailForStudentEventRequestDTO
				.verificationCode;
		studentForgotPasswordValueObject.version =
			this._sendForgotPasswordEmailForStudentEventRequestDTO.version;

		await studentRepository
			.sendForgotPasswordEmail(studentForgotPasswordValueObject);
	}
}