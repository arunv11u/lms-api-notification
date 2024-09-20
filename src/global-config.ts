import { StudentFactory } from "./student";

const defaultRoutePath = "/";

function getStudentFactory() {
	return new StudentFactory();
}

export {
	defaultRoutePath,
	getStudentFactory
};
