import { EmailRegistryRepositoryImpl } from "../../../../email";
import { getStudentFactory } from "../../../../global-config";
import {
	CustomConsumerMessage,
	ErrorCodes,
	GenericError,
	getMongoDBRepository,
	MessagingClient,
	messagingClient,
	MessagingListener,
	MessagingTopics,
	winstonLogger
} from "../../../../utils";
import {
	ProcessStudentForgotPasswordEventRequestDTOImpl,
	ProcessStudentForgotPasswordEventUseCase
} from "../../../application";
import { StudentForgotPasswordEvent } from "../event";



export class StudentForgotPasswordEventListener extends
	MessagingListener<StudentForgotPasswordEvent> {

	topic: MessagingTopics.studentForgotPasswordEvent =
		MessagingTopics.studentForgotPasswordEvent;
	fromBeginning: boolean | undefined = undefined;
	private _messagingClient: MessagingClient;

	constructor() {
		super();

		this._messagingClient = messagingClient;
	}

	async subscribe(): Promise<void> {
		this._messagingClient.consumer.subscribe({
			topic: this.topic, fromBeginning: this.fromBeginning
		});
	}

	async onMessages(
		message: CustomConsumerMessage<StudentForgotPasswordEvent>
	): Promise<void> {

		try {
			const { value } = message;

			if (!value) throw new GenericError({
				code: ErrorCodes.messageEmptyInMessagingListener,
				error: new Error("Message was empty in student forgot password event listener"),
				errorCode: 500
			});


			const emailRegistryRepository =
				new EmailRegistryRepositoryImpl(
					getMongoDBRepository()
				);

			const isForgotPasswordEmailExists =
				await emailRegistryRepository
					.isForgotPasswordEmailForStudentExists(value.id);

			if (isForgotPasswordEmailExists) {
				winstonLogger.winston.info("Skipping student forgot password event because it already exists");

				return;
			}

			const studentFactory = getStudentFactory();
			const processStudentForgotPasswordEventUseCase = studentFactory
				.make("ProcessStudentForgotPasswordEventUseCase") as ProcessStudentForgotPasswordEventUseCase;

			const processStudentForgotPasswordEventRequestDTO =
				new ProcessStudentForgotPasswordEventRequestDTOImpl();
			processStudentForgotPasswordEventRequestDTO.email =
				value.email;
			processStudentForgotPasswordEventRequestDTO.firstName =
				value.firstName;
			processStudentForgotPasswordEventRequestDTO.id = value.id;
			processStudentForgotPasswordEventRequestDTO.lastName =
				value.lastName;
			processStudentForgotPasswordEventRequestDTO.userId =
				value.userId;
			processStudentForgotPasswordEventRequestDTO.verificationCode =
				value.verificationCode;
			processStudentForgotPasswordEventRequestDTO.version =
				value.version;

			processStudentForgotPasswordEventUseCase
				.processStudentForgotPasswordEventRequestDTO =
				processStudentForgotPasswordEventRequestDTO;

			await processStudentForgotPasswordEventUseCase.execute();
		} catch (error) {
			winstonLogger.winston.error("Error in student forgot password event listener:", error);

			throw error;
		}
	}
}