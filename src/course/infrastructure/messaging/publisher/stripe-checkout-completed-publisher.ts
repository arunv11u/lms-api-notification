import { CompressionTypes, IHeaders } from "kafkajs";
import {
	CustomProducerMessage,
	ErrorCodes,
	GenericError,
	MessagingPublisher,
	MessagingTopics,
} from "../../../../utils";
import { StripeCheckoutCompletedEvent } from "../event";


export class StripeCheckoutCompletedPublisher extends
	MessagingPublisher<StripeCheckoutCompletedEvent> {
	acks: number | undefined = undefined;
	timeout: number | undefined = undefined;
	topic: MessagingTopics.stripeCheckoutCompletedEvent =
		MessagingTopics.stripeCheckoutCompletedEvent;
	compression?: CompressionTypes | undefined = undefined;

	private _messages:
		CustomProducerMessage<StripeCheckoutCompletedEvent>[] = [];

	get messages(): CustomProducerMessage<StripeCheckoutCompletedEvent>[] {
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
		value: StripeCheckoutCompletedEvent["data"],
		key?: string | null,
		partition?: number,
		headers?: IHeaders,
		timestamp?: string
	): void {
		if (!key && value.id) key = value.id.toString();

		this._messages.push({ value, key, partition, headers, timestamp });
	}
}