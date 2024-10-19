import Stripe from "stripe";
import nconf from "nconf";
import { GenericError } from "../errors";
import { ErrorCodes } from "../types";
import { winstonLogger } from "../winston";


async function verifyStripeWehbookPayload(
	payload: string,
	signature: string,
	wehbookEndpointSecret: string
): Promise<Stripe.Event> {
	try {
		const stripe = new Stripe(nconf.get("STRIPE_API_KEY"));

		const event = stripe.webhooks
			.constructEvent(payload, signature, wehbookEndpointSecret);

		return event;
	} catch (error) {
		winstonLogger.winston.error("Error verifying stripe webhook payload");

		throw new GenericError({
			code: ErrorCodes.unverifiedStripeWebhookPayload,
			error: new Error("Error verifying stripe webhook payload"),
			errorCode: 400
		});
	}
}

export {
	verifyStripeWehbookPayload
};