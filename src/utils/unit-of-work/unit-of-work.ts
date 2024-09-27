/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines */
import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";
import { GenericError } from "../errors";
import {
	ErrorCodes,
	Repository,
	UnitOfWork
} from "../types";
import { getMongoDBRepository } from "../helpers";
import { StudentRepository } from "../../student";
import { getInstructorFactory, getStudentFactory } from "../../global-config";
import { InstructorRepository } from "../../instructor";


//! Do not export this Repositories enum at any cost.
enum Repositories {
	studentRepository = "StudentRepository",
	instructorRepository = "InstructorRepository"
}

class UnitOfWorkImpl implements UnitOfWork {

	private _repositories = [
		Repositories.studentRepository,
		Repositories.instructorRepository
	];

	private _mongoDBRepository: MongoDBRepository;
	private _studentRepository: StudentRepository;
	private _instructorRepository: InstructorRepository;

	constructor() {
		this._mongoDBRepository = getMongoDBRepository();

		this._studentRepository = getStudentFactory().make("StudentRepository") as StudentRepository;
		this._studentRepository.mongoDBRepository = this._mongoDBRepository;

		this._instructorRepository = getInstructorFactory().make("InstructorRepository") as InstructorRepository;
		this._instructorRepository.mongoDBRepository = this._mongoDBRepository;
	}

	async start() {
		await this._mongoDBRepository.startTransaction();
	}

	getAllRepositoryNames() {
		return this._repositories;
	}

	getRepository(repositoryName: string): Repository {

		if (repositoryName === Repositories.studentRepository)
			return this._studentRepository;

		if (repositoryName === Repositories.instructorRepository)
			return this._instructorRepository;

		throw new GenericError({
			code: ErrorCodes.internalError,
			error: new Error("Given repository not found"),
			errorCode: 500
		});
	}

	async complete() {
		await this._mongoDBRepository.commitTransaction();
	}

	async dispose() {
		await this._mongoDBRepository.abortTransaction();
	}
}

export {
	UnitOfWorkImpl
};