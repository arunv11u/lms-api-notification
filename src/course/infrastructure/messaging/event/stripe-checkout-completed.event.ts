import { MessagingTopics } from "../../../../utils";



interface StripeCheckoutCompletedEvent {
	topic: MessagingTopics.stripeCheckoutCompletedEvent;
	data: {
		id: string;
		type: string;
		orderId: string;
		version: number;
	}
}

export {
	StripeCheckoutCompletedEvent
};