import { CompressionTypes, IHeaders } from "kafkajs";
import {
	CustomProducerMessage,
	ErrorCodes,
	GenericError,
	MessagingPublisher,
	MessagingTopics,
} from "../../../../utils";
import { CourseTranscodingCompletedEvent } from "../event";


export class CourseTranscodingCompletedPublisher extends
	MessagingPublisher<CourseTranscodingCompletedEvent> {
	acks: number | undefined = undefined;
	timeout: number | undefined = undefined;
	topic: MessagingTopics.courseTranscodingCompletedEvent =
		MessagingTopics.courseTranscodingCompletedEvent;
	compression?: CompressionTypes | undefined = undefined;

	private _messages:
		CustomProducerMessage<CourseTranscodingCompletedEvent>[] = [];

	get messages(): CustomProducerMessage<CourseTranscodingCompletedEvent>[] {
		if (!this._messages)
			throw new GenericError({
				code: ErrorCodes.kafkaProducerMessageNotAvailable,
				error: new Error("_messages should be available before publishing a topic"),
				errorCode: 500
			});

		return this._messages;
	}

	// eslint-disable-next-line max-params
	pushMessage(
		value: CourseTranscodingCompletedEvent["data"],
		key?: string | null,
		partition?: number,
		headers?: IHeaders,
		timestamp?: string
	): void {
		if (!key && value.id) key = value.id.toString();

		this._messages.push({ value, key, partition, headers, timestamp });
	}
}