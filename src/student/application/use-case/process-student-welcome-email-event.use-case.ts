import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { StudentRepository, StudentWelcomeEventValueObject } from "../../domain";
import { ProcessStudentWelcomEmailEventRequestDTO } from "../dto";
import { ProcessStudentWelcomeEmailEventUsecase } from "./process-student-welcome-email-event.use-case.type";




export class ProcessStudentWelcomeEmailEventUsecaseImpl implements
	ProcessStudentWelcomeEmailEventUsecase {
	private _unitOfWork: UnitOfWork;
	private _processStudentWelcomEmailEventRequestDTO:
		ProcessStudentWelcomEmailEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set processStudentWelcomEmailEventRequestDTO(
		processStudentWelcomEmailEventRequestDTO:
			ProcessStudentWelcomEmailEventRequestDTO
	) {
		this._processStudentWelcomEmailEventRequestDTO =
			processStudentWelcomEmailEventRequestDTO;
	}

	async execute(): Promise<void> {
		const studentRepository = this._unitOfWork
			.getRepository("StudentRepository") as StudentRepository;

		const studentWelcomeEventValueObject =
			new StudentWelcomeEventValueObject();
		studentWelcomeEventValueObject.email =
			this._processStudentWelcomEmailEventRequestDTO.email;
		studentWelcomeEventValueObject.firstName =
			this._processStudentWelcomEmailEventRequestDTO.firstName;
		studentWelcomeEventValueObject.id =
			this._processStudentWelcomEmailEventRequestDTO.id;
		studentWelcomeEventValueObject.lastName =
			this._processStudentWelcomEmailEventRequestDTO.lastName;
		studentWelcomeEventValueObject.userId =
			this._processStudentWelcomEmailEventRequestDTO.userId;
		studentWelcomeEventValueObject.version =
			this._processStudentWelcomEmailEventRequestDTO.version;

		await studentRepository
			.sendWelcomeEmail(studentWelcomeEventValueObject);
	}
}