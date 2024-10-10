import { CourseFactory } from "./course";
import { InstructorFactory } from "./instructor";
import { StudentFactory } from "./student";

const defaultRoutePath = "/";

function getStudentFactory() {
	return new StudentFactory();
}

function getInstructorFactory() {
	return new InstructorFactory();
}

function getCourseFactory() {
	return new CourseFactory();
}

export {
	defaultRoutePath,
	getStudentFactory,
	getInstructorFactory,
	getCourseFactory
};
