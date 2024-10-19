import {
	CourseObject,
	CourseRepository,
	PublishCourseTranscodingCompletedEventValueObject,
	StripeCheckoutCompletedEventValueObject
} from "../../domain";
import {
	CourseTranscodingCompletedEvent,
	CourseTranscodingCompletedPublisher,
	StripeCheckoutCompletedPublisher
} from "../messaging";



class CourseRepositoryImpl implements CourseRepository, CourseObject {

	async publishCourseTranscodingCompletedEvent(
		publishCourseTranscodingCompletedEventValueObject:
			PublishCourseTranscodingCompletedEventValueObject
	): Promise<void> {
		const courseTranscodingCompletedPublisher =
			new CourseTranscodingCompletedPublisher();

		const message: CourseTranscodingCompletedEvent["data"] = {
			id: publishCourseTranscodingCompletedEventValueObject.messageId,
			payload: []
		};
		publishCourseTranscodingCompletedEventValueObject.payload
			.forEach(valueObject => {
				message.payload.push({
					duration: valueObject.duration,
					key: valueObject.key,
					lectureId: valueObject.lectureId,
					playlistName: valueObject.playlistName,
					status: valueObject.status,
					thumbnailPattern: valueObject.thumbnailPattern
				});
			});

		courseTranscodingCompletedPublisher.pushMessage(message);

		await courseTranscodingCompletedPublisher.publish();
	}

	async publishStripeCheckoutCompletedEvent(
		stripeCheckoutCompletedEventValueObject:
			StripeCheckoutCompletedEventValueObject
	): Promise<void> {
		const stripeCheckoutCompletedPublisher =
			new StripeCheckoutCompletedPublisher();

		stripeCheckoutCompletedPublisher.pushMessage({
			id: stripeCheckoutCompletedEventValueObject.id,
			orderId: stripeCheckoutCompletedEventValueObject.orderId,
			type: stripeCheckoutCompletedEventValueObject.type,
			version: stripeCheckoutCompletedEventValueObject.version
		});

		await stripeCheckoutCompletedPublisher.publish();
	}
}

export {
	CourseRepositoryImpl
};