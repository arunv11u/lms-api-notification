import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { StudentForgotPasswordEventValueObject, StudentRepository } from "../../domain";
import { ProcessStudentForgotPasswordEventRequestDTO } from "../dto";
import { ProcessStudentForgotPasswordEventUseCase } from "./process-student-forgot-password-event.use-case.type";




export class ProcessStudentForgotPasswordEventUseCaseImpl implements
	ProcessStudentForgotPasswordEventUseCase {
	private _unitOfWork: UnitOfWork;
	private _processStudentForgotPasswordEventRequestDTO:
		ProcessStudentForgotPasswordEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set processStudentForgotPasswordEventRequestDTO(
		processStudentForgotPasswordEventRequestDTO:
			ProcessStudentForgotPasswordEventRequestDTO
	) {
		this._processStudentForgotPasswordEventRequestDTO =
			processStudentForgotPasswordEventRequestDTO;
	}

	async execute(): Promise<void> {
		const studentRepository = this._unitOfWork
			.getRepository("StudentRepository") as StudentRepository;

		const studentForgotPasswordEventValueObject =
			new StudentForgotPasswordEventValueObject();
		studentForgotPasswordEventValueObject.email =
			this._processStudentForgotPasswordEventRequestDTO.email;
		studentForgotPasswordEventValueObject.firstName =
			this._processStudentForgotPasswordEventRequestDTO.firstName;
		studentForgotPasswordEventValueObject.id =
			this._processStudentForgotPasswordEventRequestDTO.id;
		studentForgotPasswordEventValueObject.lastName =
			this._processStudentForgotPasswordEventRequestDTO.lastName;
		studentForgotPasswordEventValueObject.userId =
			this._processStudentForgotPasswordEventRequestDTO.userId;
		studentForgotPasswordEventValueObject.verificationCode =
			this._processStudentForgotPasswordEventRequestDTO
				.verificationCode;
		studentForgotPasswordEventValueObject.version =
			this._processStudentForgotPasswordEventRequestDTO.version;

		await studentRepository
			.sendForgotPasswordEmail(studentForgotPasswordEventValueObject);
	}
}