import { EmailRegistryRepositoryImpl } from "../../../../email";
import { getStudentFactory } from "../../../../global-config";
import {
	CustomConsumerMessage,
	ErrorCodes,
	GenericError,
	getMongoDBRepository,
	messagingClient,
	MessagingClient,
	MessagingListener,
	MessagingTopics,
	winstonLogger
} from "../../../../utils";
import { ProcessStudentWelcomeEmailEventUsecase, ProcessStudentWelcomEmailEventRequestDTOImpl } from "../../../application";
import { StudentWelcomeEmailEvent } from "../event";




export class StudentWelcomeEventListener extends
	MessagingListener<StudentWelcomeEmailEvent> {

	topic: MessagingTopics.studentWelcomeEvent =
		MessagingTopics.studentWelcomeEvent;
	fromBeginning: boolean | undefined = undefined;
	private _messagingClient: MessagingClient;

	constructor() {
		super();

		this._messagingClient = messagingClient;
	}

	async subscribe(): Promise<void> {
		this._messagingClient.consumer.subscribe({
			topic: this.topic,
			fromBeginning: this.fromBeginning
		});
	}

	async onMessages(
		message: CustomConsumerMessage<StudentWelcomeEmailEvent>
	): Promise<void> {

		try {
			const { value } = message;

			if (!value) throw new GenericError({
				code: ErrorCodes.messageEmptyInMessagingListener,
				error: new Error("Message was empty in student welcome event listener"),
				errorCode: 500
			});


			const emailRegistryRepository =
				new EmailRegistryRepositoryImpl(
					getMongoDBRepository()
				);

			const isWelcomeEmailExists =
				await emailRegistryRepository
					.isWelcomeEmailForStudentExists(value.id);

			if (isWelcomeEmailExists) {
				winstonLogger.winston.info("Skipping welcome email for student because it already exists");

				return;
			}

			const studentFactory = getStudentFactory();
			const processStudentWelcomeEmailEventUsecase = studentFactory
				.make("ProcessStudentWelcomeEmailEventUsecase") as ProcessStudentWelcomeEmailEventUsecase;

			const processStudentWelcomEmailEventRequestDTO =
				new ProcessStudentWelcomEmailEventRequestDTOImpl();
			processStudentWelcomEmailEventRequestDTO.email =
				value.email;
			processStudentWelcomEmailEventRequestDTO.firstName =
				value.firstName;
			processStudentWelcomEmailEventRequestDTO.id = value.id;
			processStudentWelcomEmailEventRequestDTO.lastName =
				value.lastName;
			processStudentWelcomEmailEventRequestDTO.userId =
				value.userId;
			processStudentWelcomEmailEventRequestDTO.version =
				value.version;

			processStudentWelcomeEmailEventUsecase
				.processStudentWelcomEmailEventRequestDTO =
				processStudentWelcomEmailEventRequestDTO;

			await processStudentWelcomeEmailEventUsecase.execute();
		} catch (error) {
			winstonLogger.winston.error("Error in student welcome event listener :", error);

			throw error;
		}
	}
}