

interface PublishStripeCheckoutCompletedEventRequestDTO {
	eventId: string;
	type: string;
	orderId: string;
}

export {
	PublishStripeCheckoutCompletedEventRequestDTO
};