/* eslint-disable indent */
/* eslint-disable max-classes-per-file */
import nconf from "nconf";
import {
	CompressionCodecs,
	CompressionTypes,
	ConsumerConfig,
	ConsumerRunConfig,
	Partitioners,
	ProducerConfig
} from "kafkajs";
import { MessagingListener, MessagingTopics, Winston, winstonLogger } from "./utils";
import {
	StudentForgotPasswordEventListener,
	StudentWelcomeEventListener
} from "./student";
import {
	InstructorWelcomeEventListener
} from "./instructor";



class MessagingLoaderImpl {

	private _clientId: string;
	private _producerConfig: ProducerConfig;
	private _consumerConfig: ConsumerConfig;
	private _consumerRunConfig: ConsumerRunConfig;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _listeners: MessagingListener<{ topic: string, data: any }>[];
	private _studentForgotPasswordEventListener =
		new StudentForgotPasswordEventListener();
	private _studentWelcomeEventListener =
		new StudentWelcomeEventListener();
	private _instructorWelcomeEventListener =
		new InstructorWelcomeEventListener();
	private _winston: Winston;

	constructor() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const SnappyCodec = require("kafkajs-snappy");
		CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec;

		this._winston = winstonLogger.winston;

		this._clientId = "notification-service";

		this._listeners = [
			this._studentForgotPasswordEventListener,
			this._studentWelcomeEventListener,
			this._instructorWelcomeEventListener
		];

		this._producerConfig = {
			createPartitioner: Partitioners.LegacyPartitioner,
			maxInFlightRequests: 5
		};

		this._consumerConfig = {
			groupId: nconf.get("messagingConsumerGroupId"),
			allowAutoTopicCreation: false
		};

		this._consumerRunConfig = {
			autoCommitThreshold: 1,
			partitionsConsumedConcurrently: 3,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			eachMessage: async ({ topic, partition, message, heartbeat }) => {
				this._winston.info("Message received ::", { topic, partition, message });
				if (message && message.value) {
					this._winston.debug(`${{
						value: message.value.toString(),
						headers: message.headers,
					}}`);

					switch (topic) {
						case MessagingTopics.studentForgotPasswordEvent: {
							this._winston.info("Student forgot password event listener called :");

							await this
								._studentForgotPasswordEventListener
								.listen(message);

							break;
						}

						case MessagingTopics.studentWelcomeEvent: {
							this._winston.info("Student welcome email event listener called :");

							await this
								._studentWelcomeEventListener
								.listen(message);

							break;
						}

						case MessagingTopics.instructorWelcomeEvent: {
							this._winston.info("Instructor welcome email event listener called :");

							await this
								._instructorWelcomeEventListener
								.listen(message);

							break;
						}

						default: {
							this._winston.error("Topic is not listed in consumer run config");
						}
					}

					this._winston.info("consumer offset about to be commited ::", { topic, partition, offset: message.offset });
				}
			}
		};

	}

	get clientId(): string {
		return this._clientId;
	}

	get producerConfig(): ProducerConfig {
		return this._producerConfig;
	}

	get consumerConfig(): ConsumerConfig {
		return this._consumerConfig;
	}

	get consumerRunConfig(): ConsumerRunConfig {
		return this._consumerRunConfig;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get listeners(): MessagingListener<{ topic: string, data: any }>[] {
		return this._listeners;
	}
}

export {
	MessagingLoaderImpl
};