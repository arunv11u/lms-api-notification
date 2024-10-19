import { PublishStripeCheckoutCompletedEventRequestDTO } from "./publish-stripe-checkout-completed-event.request.dto.type";


class PublishStripeCheckoutCompletedEventRequestDTOImpl implements
	PublishStripeCheckoutCompletedEventRequestDTO {
	eventId: string;
	orderId: string;
	type: string;
}

export {
	PublishStripeCheckoutCompletedEventRequestDTOImpl
};