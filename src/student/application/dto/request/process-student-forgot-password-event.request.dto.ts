import { ProcessStudentForgotPasswordEventRequestDTO } from "./process-student-forgot-password-event.request.dto.type";


class ProcessStudentForgotPasswordEventRequestDTOImpl implements
	ProcessStudentForgotPasswordEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	verificationCode: string;
	version: number;
}

export {
	ProcessStudentForgotPasswordEventRequestDTOImpl
};