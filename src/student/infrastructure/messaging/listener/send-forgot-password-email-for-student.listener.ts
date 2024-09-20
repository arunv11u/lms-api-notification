import { ForgotPasswordRegistryRepositoryImpl } from "../../../../forgot-password-registry";
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
	SendForgotPasswordEmailForStudentEventRequestDTOImpl,
	SendForgotPasswordEmailForStudentEventUseCase
} from "../../../application";
import { StudentForgotPasswordEvent } from "../event";



export class SendForgotPasswordEmailForStudentListener extends
	MessagingListener<StudentForgotPasswordEvent> {

	topic = MessagingTopics.studentForgotPasswordEvent;
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
				error: new Error("Message was empty in student created listener"),
				errorCode: 500
			});


			const forgotPasswordRegistryRepository =
				new ForgotPasswordRegistryRepositoryImpl(
					getMongoDBRepository()
				);

			const isForgotPasswordEmailExists =
				await forgotPasswordRegistryRepository
					.isForgotPasswordEmailForStudentExists(value.id);

			if (isForgotPasswordEmailExists) {
				winstonLogger.winston.info("Skipping forgot password email for student because it already exists");

				return;
			}

			const studentFactory = getStudentFactory();
			const sendForgotPasswordEmailForStudentEventUseCase = studentFactory
				.make("SendForgotPasswordEmailForStudentEventUseCase") as SendForgotPasswordEmailForStudentEventUseCase;

			const sendForgotPasswordEmailForStudentEventRequestDTO =
				new SendForgotPasswordEmailForStudentEventRequestDTOImpl();
			sendForgotPasswordEmailForStudentEventRequestDTO.email =
				value.email;
			sendForgotPasswordEmailForStudentEventRequestDTO.firstName =
				value.firstName;
			sendForgotPasswordEmailForStudentEventRequestDTO.id = value.id;
			sendForgotPasswordEmailForStudentEventRequestDTO.lastName =
				value.lastName;
			sendForgotPasswordEmailForStudentEventRequestDTO.userId =
				value.userId;
			sendForgotPasswordEmailForStudentEventRequestDTO.verificationCode =
				value.verificationCode;
			sendForgotPasswordEmailForStudentEventRequestDTO.version =
				value.version;

			sendForgotPasswordEmailForStudentEventUseCase
				.sendForgotPasswordEmailForStudentEventRequestDTO =
				sendForgotPasswordEmailForStudentEventRequestDTO;

			await sendForgotPasswordEmailForStudentEventUseCase.execute();
		} catch (error) {
			winstonLogger.winston.error("Error in send forgot password email for student listener :", error);

			throw error;
		}
	}
}