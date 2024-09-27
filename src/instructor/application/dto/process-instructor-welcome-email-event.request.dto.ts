import { ProcessInstructorWelcomEmailEventRequestDTO } from "./process-instructor-welcome-email-event.request.dto.type";


class ProcessInstructorWelcomEmailEventRequestDTOImpl implements
	ProcessInstructorWelcomEmailEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	version: number;
}

export {
	ProcessInstructorWelcomEmailEventRequestDTOImpl
};