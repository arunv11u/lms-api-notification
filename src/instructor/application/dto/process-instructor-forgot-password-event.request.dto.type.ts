

interface ProcessInstructorForgotPasswordEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	verificationCode: string;
	version: number;
}

export {
	ProcessInstructorForgotPasswordEventRequestDTO
};