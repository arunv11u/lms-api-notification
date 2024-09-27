import { EmailRegistryRepositoryImpl } from "../../../../email";
import { getInstructorFactory } from "../../../../global-config";
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
	ProcessInstructorForgotPasswordEventRequestDTOImpl,
	ProcessInstructorForgotPasswordEventUseCase
} from "../../../application";
import { InstructorForgotPasswordEvent } from "../event";



export class InstructorForgotPasswordEventListener extends
	MessagingListener<InstructorForgotPasswordEvent> {

	topic: MessagingTopics.instructorForgotPasswordEvent =
		MessagingTopics.instructorForgotPasswordEvent;
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
		message: CustomConsumerMessage<InstructorForgotPasswordEvent>
	): Promise<void> {

		try {
			const { value } = message;

			if (!value) throw new GenericError({
				code: ErrorCodes.messageEmptyInMessagingListener,
				error: new Error("Message was empty in instructor forgot password event listener"),
				errorCode: 500
			});


			const emailRegistryRepository =
				new EmailRegistryRepositoryImpl(
					getMongoDBRepository()
				);

			const isForgotPasswordEmailExists =
				await emailRegistryRepository
					.isForgotPasswordEmailForInstructorExists(value.id);

			if (isForgotPasswordEmailExists) {
				winstonLogger.winston.info("Skipping instructor forgot password event because it already exists");

				return;
			}

			const instructorFactory = getInstructorFactory();
			const processInstructorForgotPasswordEventUseCase =
				instructorFactory
					.make("ProcessInstructorForgotPasswordEventUseCase") as ProcessInstructorForgotPasswordEventUseCase;

			const processInstructorForgotPasswordEventRequestDTO =
				new ProcessInstructorForgotPasswordEventRequestDTOImpl();
			processInstructorForgotPasswordEventRequestDTO.email =
				value.email;
			processInstructorForgotPasswordEventRequestDTO.firstName =
				value.firstName;
			processInstructorForgotPasswordEventRequestDTO.id = value.id;
			processInstructorForgotPasswordEventRequestDTO.lastName =
				value.lastName;
			processInstructorForgotPasswordEventRequestDTO.userId =
				value.userId;
			processInstructorForgotPasswordEventRequestDTO.verificationCode =
				value.verificationCode;
			processInstructorForgotPasswordEventRequestDTO.version =
				value.version;

			processInstructorForgotPasswordEventUseCase
				.processInstructorForgotPasswordEventRequestDTO =
				processInstructorForgotPasswordEventRequestDTO;

			await processInstructorForgotPasswordEventUseCase.execute();
		} catch (error) {
			winstonLogger.winston.error("Error in instructor forgot password event listener:", error);

			throw error;
		}
	}
}