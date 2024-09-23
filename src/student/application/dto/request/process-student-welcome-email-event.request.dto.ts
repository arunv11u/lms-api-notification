import { ProcessStudentWelcomEmailEventRequestDTO } from "./process-student-welcome-email-event.request.dto.type";


class ProcessStudentWelcomEmailEventRequestDTOImpl implements
	ProcessStudentWelcomEmailEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	version: number;
}

export {
	ProcessStudentWelcomEmailEventRequestDTOImpl
};