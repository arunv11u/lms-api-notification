import { InstructorFactory } from "./instructor";
import { StudentFactory } from "./student";

const defaultRoutePath = "/";

function getStudentFactory() {
	return new StudentFactory();
}

function getInstructorFactory() {
	return new InstructorFactory();
}

export {
	defaultRoutePath,
	getStudentFactory,
	getInstructorFactory
};
