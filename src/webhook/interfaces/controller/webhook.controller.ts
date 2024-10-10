import express, {
	Request,
	Response,
	NextFunction
} from "express";
import { Controller, Post, Use } from "@arunvaradharajalu/common.decorators";
import { 
	ErrorCodes, 
	GenericError, 
	getResponseHandler, 
	verifySNSMessageSignature, 
	winstonLogger 
} from "../../../utils";
import { getCourseFactory } from "../../../global-config";
import {
	PublishCourseTranscodingCompletedEventPayloadRequestDTOImpl,
	PublishCourseTranscodingCompletedEventRequestDTOImpl,
	PublishCourseTranscodingCompletedEventUseCase
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
			const lectureIds = userMetadata.lectureIds.split(",");

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
}