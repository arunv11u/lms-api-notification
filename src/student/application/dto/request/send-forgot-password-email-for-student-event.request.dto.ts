import { SendForgotPasswordEmailForStudentEventRequestDTO } from "./send-forgot-password-email-for-student-event.request.dto.type";


class SendForgotPasswordEmailForStudentEventRequestDTOImpl implements
	SendForgotPasswordEmailForStudentEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	verificationCode: string;
	version: number;
}

export {
	SendForgotPasswordEmailForStudentEventRequestDTOImpl
};