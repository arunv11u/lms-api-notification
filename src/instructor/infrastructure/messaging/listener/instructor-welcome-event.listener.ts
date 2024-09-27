import { EmailRegistryRepositoryImpl } from "../../../../email";
import { getInstructorFactory } from "../../../../global-config";
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
import {
	ProcessInstructorWelcomeEmailEventUsecase,
	ProcessInstructorWelcomEmailEventRequestDTOImpl
} from "../../../application";
import { InstructorWelcomeEmailEvent } from "../event";


export class InstructorWelcomeEventListener extends
	MessagingListener<InstructorWelcomeEmailEvent> {

	topic: MessagingTopics.instructorWelcomeEvent =
		MessagingTopics.instructorWelcomeEvent;
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
		message: CustomConsumerMessage<InstructorWelcomeEmailEvent>
	): Promise<void> {

		try {
			const { value } = message;

			if (!value) throw new GenericError({
				code: ErrorCodes.messageEmptyInMessagingListener,
				error: new Error("Message was empty in instructor welcome event listener"),
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
				winstonLogger.winston.info("Skipping welcome email for instructor because it already exists");

				return;
			}

			const instructorFactory = getInstructorFactory();
			const processInstructorWelcomeEmailEventUsecase = instructorFactory
				.make("ProcessInstructorWelcomeEmailEventUsecase") as ProcessInstructorWelcomeEmailEventUsecase;

			const processInstructorWelcomEmailEventRequestDTO =
				new ProcessInstructorWelcomEmailEventRequestDTOImpl();
			processInstructorWelcomEmailEventRequestDTO.email =
				value.email;
			processInstructorWelcomEmailEventRequestDTO.firstName =
				value.firstName;
			processInstructorWelcomEmailEventRequestDTO.id = value.id;
			processInstructorWelcomEmailEventRequestDTO.lastName =
				value.lastName;
			processInstructorWelcomEmailEventRequestDTO.userId =
				value.userId;
			processInstructorWelcomEmailEventRequestDTO.version =
				value.version;

			processInstructorWelcomeEmailEventUsecase
				.processInstructorWelcomEmailEventRequestDTO =
				processInstructorWelcomEmailEventRequestDTO;

			await processInstructorWelcomeEmailEventUsecase.execute();
		} catch (error) {
			winstonLogger.winston.error("Error in instructor welcome event listener :", error);

			throw error;
		}
	}
}