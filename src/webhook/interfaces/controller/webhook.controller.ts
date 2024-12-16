/* eslint-disable indent */
import express, {
	Request,
	Response,
	NextFunction
} from "express";
import nconf from "nconf";
import { Controller, Post, Use } from "@arunvaradharajalu/common.decorators";
import {
	ErrorCodes,
	GenericError,
	getResponseHandler,
	verifySNSMessageSignature,
	verifyStripeWehbookPayload,
	winstonLogger
} from "../../../utils";
import { getCourseFactory } from "../../../global-config";
import {
	PublishCourseTranscodingCompletedEventPayloadRequestDTOImpl,
	PublishCourseTranscodingCompletedEventRequestDTOImpl,
	PublishCourseTranscodingCompletedEventUseCase,
	PublishStripeCheckoutCompletedEventRequestDTOImpl,
	PublishStripeCheckoutCompletedEventUseCase
} from "../../../course";



@Controller("/webhook")
export class WebhookController {

	@Post("/transcoder")
	@Use(express.text({ type: "text/plain" }))
	async listenForCourseTranscoderWebhook(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Listening for transcoder webhook event");

			const requestBody = JSON.parse(request.body);

			const isVerifiedMessage = await verifySNSMessageSignature(
				requestBody
			);
			if (!isVerifiedMessage)
				throw new GenericError(
					{
						code: ErrorCodes.unverifiedSNSMessage,
						error: new Error("SNS message is invalid"),
						errorCode: 403
					}
				);

			const responseHandler = getResponseHandler();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const message = JSON.parse(requestBody.Message) as any;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const outputs = message.outputs as any[];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const playlists = message.playlists as any[];
			const userMetadata = message.userMetadata as Record<string, string>;
			const lectureIds = userMetadata.lectureIds.split("_");

			const publishCourseTranscodingCompletedEventUsecase =
				getCourseFactory().make("PublishCourseTranscodingCompletedEventUseCase") as PublishCourseTranscodingCompletedEventUseCase;

			const publishCourseTranscodingCompletedEventRequestDTO =
				new PublishCourseTranscodingCompletedEventRequestDTOImpl();

			publishCourseTranscodingCompletedEventRequestDTO.messageId =
				requestBody.MessageId;

			for (const [outputIndex, output] of outputs.entries()) {
				const publishCourseTranscodingCompletedEventPayloadRequestDTO =
					// eslint-disable-next-line max-len
					new PublishCourseTranscodingCompletedEventPayloadRequestDTOImpl();

				publishCourseTranscodingCompletedEventPayloadRequestDTO
					.duration = output.duration;
				publishCourseTranscodingCompletedEventPayloadRequestDTO
					.key = output.key;
				publishCourseTranscodingCompletedEventPayloadRequestDTO
					.lectureId = lectureIds[outputIndex];
				publishCourseTranscodingCompletedEventPayloadRequestDTO
					.playlistName = playlists[outputIndex].name;
				publishCourseTranscodingCompletedEventPayloadRequestDTO
					.status = playlists[outputIndex].status;
				publishCourseTranscodingCompletedEventPayloadRequestDTO
					.thumbnailPattern = output.thumbnailPattern;

				publishCourseTranscodingCompletedEventRequestDTO
					.payload
					.push(
						publishCourseTranscodingCompletedEventPayloadRequestDTO
					);
			}

			publishCourseTranscodingCompletedEventUsecase
				.publishCourseTranscodingCompletedEventRequestDTO =
				publishCourseTranscodingCompletedEventRequestDTO;

			await publishCourseTranscodingCompletedEventUsecase.execute();

			responseHandler.ok(response);
		} catch (error) {
			winston.error(
				"Error in listening for transcoder webhook event:",
				error
			);

			next(error);
		}
	}

	@Post("/payment")
	@Use(express.raw({ type: "application/json" }))
	async listenForPaymentWebhook(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const winston = winstonLogger.winston;
		try {
			winston.info("Listening for payment webhook event");
			const signature = request.headers["stripe-signature"] as string;
			const wehbookEndpointSecret = nconf.get("STRIPE_WEBHOOK_SECRET");

			const responseHandler = getResponseHandler();

			const event = verifyStripeWehbookPayload(
				request.body,
				signature,
				wehbookEndpointSecret
			);

			switch (event.type) {
				case "checkout.session.completed": {
					const checkoutSessionCompletedEvent =
						// eslint-disable-next-line max-len
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						event.data.object as Record<string, any>;

					const publishstripeCheckoutCompletedEventRequestDTO =
						new PublishStripeCheckoutCompletedEventRequestDTOImpl();
					publishstripeCheckoutCompletedEventRequestDTO
						.eventId = event.id;
					publishstripeCheckoutCompletedEventRequestDTO.orderId =
						checkoutSessionCompletedEvent.metadata.orderId;

					const publishStripeCheckoutCompletedUseCase =
						getCourseFactory()
							.make("PublishStripeCheckoutCompletedEventUseCase") as PublishStripeCheckoutCompletedEventUseCase;

					publishStripeCheckoutCompletedUseCase
						.publishstripeCheckoutCompletedEventRequestDTO =
						publishstripeCheckoutCompletedEventRequestDTO;

					await publishStripeCheckoutCompletedUseCase.execute();

					break;
				}
				default:
					winstonLogger.winston.error(`Unhandled event type : ${event.type}`);
			}

			responseHandler.ok(response);
		} catch (error) {
			winston.error(
				"Error in listening for payment webhook event:",
				error
			);

			next(error);
		}
	}
}