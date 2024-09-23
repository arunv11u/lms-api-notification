

interface ProcessStudentWelcomEmailEventRequestDTO {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	version: number;
}

export {
	ProcessStudentWelcomEmailEventRequestDTO
};