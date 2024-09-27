import { ProcessInstructorForgotPasswordEventRequestDTO } from "./process-instructor-forgot-password-event.request.dto.type";


class ProcessInstructorForgotPasswordEventRequestDTOImpl implements
	ProcessInstructorForgotPasswordEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	verificationCode: string;
	version: number;
}

export {
	ProcessInstructorForgotPasswordEventRequestDTOImpl
};