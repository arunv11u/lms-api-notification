import { PublishStripeCheckoutCompletedEventValueObject } from "../value-object";
import { PublishCourseTranscodingCompletedEventValueObject } from "../value-object/publish-course-transcoding-completed-event.value-object";


export abstract class CourseRepository {

	abstract publishCourseTranscodingCompletedEvent(
		publishCourseTranscodingCompletedEventValueObject:
			PublishCourseTranscodingCompletedEventValueObject
	): Promise<void>;

	abstract publishStripeCheckoutCompletedEvent(
		publishStripeCheckoutCompletedEventValueObject:
			PublishStripeCheckoutCompletedEventValueObject
	): Promise<void>;
}