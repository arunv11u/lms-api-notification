import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { InstructorForgotPasswordEventValueObject, InstructorRepository } from "../../domain";
import { ProcessInstructorForgotPasswordEventRequestDTO } from "../dto";
import { ProcessInstructorForgotPasswordEventUseCase } from "./process-instructor-forgot-password-event.use-case.type";




export class ProcessInstructorForgotPasswordEventUseCaseImpl implements
	ProcessInstructorForgotPasswordEventUseCase {
	private _unitOfWork: UnitOfWork;
	private _processInstructorForgotPasswordEventRequestDTO:
		ProcessInstructorForgotPasswordEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set processInstructorForgotPasswordEventRequestDTO(
		processInstructorForgotPasswordEventRequestDTO:
			ProcessInstructorForgotPasswordEventRequestDTO
	) {
		this._processInstructorForgotPasswordEventRequestDTO =
			processInstructorForgotPasswordEventRequestDTO;
	}

	async execute(): Promise<void> {
		const instructorRepository = this._unitOfWork
			.getRepository("InstructorRepository") as InstructorRepository;

		const instructorForgotPasswordEventValueObject =
			new InstructorForgotPasswordEventValueObject();
		instructorForgotPasswordEventValueObject.email =
			this._processInstructorForgotPasswordEventRequestDTO.email;
		instructorForgotPasswordEventValueObject.firstName =
			this._processInstructorForgotPasswordEventRequestDTO.firstName;
		instructorForgotPasswordEventValueObject.id =
			this._processInstructorForgotPasswordEventRequestDTO.id;
		instructorForgotPasswordEventValueObject.lastName =
			this._processInstructorForgotPasswordEventRequestDTO.lastName;
		instructorForgotPasswordEventValueObject.userId =
			this._processInstructorForgotPasswordEventRequestDTO.userId;
		instructorForgotPasswordEventValueObject.verificationCode =
			this._processInstructorForgotPasswordEventRequestDTO
				.verificationCode;
		instructorForgotPasswordEventValueObject.version =
			this._processInstructorForgotPasswordEventRequestDTO.version;

		await instructorRepository
			.sendForgotPasswordEmail(instructorForgotPasswordEventValueObject);
	}
}