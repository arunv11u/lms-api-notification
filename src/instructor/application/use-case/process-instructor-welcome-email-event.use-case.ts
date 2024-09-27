import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { InstructorRepository, InstructorWelcomeEventValueObject } from "../../domain";
import { ProcessInstructorWelcomEmailEventRequestDTO } from "../dto";
import { ProcessInstructorWelcomeEmailEventUsecase } from "./process-instructor-welcome-email-event.use-case.type";




export class ProcessInstructorWelcomeEmailEventUsecaseImpl implements
	ProcessInstructorWelcomeEmailEventUsecase {
	private _unitOfWork: UnitOfWork;
	private _processInstructorWelcomEmailEventRequestDTO:
		ProcessInstructorWelcomEmailEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set processInstructorWelcomEmailEventRequestDTO(
		processInstructorWelcomEmailEventRequestDTO:
			ProcessInstructorWelcomEmailEventRequestDTO
	) {
		this._processInstructorWelcomEmailEventRequestDTO =
			processInstructorWelcomEmailEventRequestDTO;
	}

	async execute(): Promise<void> {
		const instructorRepository = this._unitOfWork
			.getRepository("InstructorRepository") as InstructorRepository;

		const instructorWelcomeEventValueObject =
			new InstructorWelcomeEventValueObject();
		instructorWelcomeEventValueObject.email =
			this._processInstructorWelcomEmailEventRequestDTO.email;
		instructorWelcomeEventValueObject.firstName =
			this._processInstructorWelcomEmailEventRequestDTO.firstName;
		instructorWelcomeEventValueObject.id =
			this._processInstructorWelcomEmailEventRequestDTO.id;
		instructorWelcomeEventValueObject.lastName =
			this._processInstructorWelcomEmailEventRequestDTO.lastName;
		instructorWelcomeEventValueObject.userId =
			this._processInstructorWelcomEmailEventRequestDTO.userId;
		instructorWelcomeEventValueObject.version =
			this._processInstructorWelcomEmailEventRequestDTO.version;

		await instructorRepository
			.sendWelcomeEmail(instructorWelcomeEventValueObject);
	}
}