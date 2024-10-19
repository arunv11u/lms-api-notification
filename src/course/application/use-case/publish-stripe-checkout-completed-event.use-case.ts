import { getCourseFactory } from "../../../global-config";
import { CourseRepository, PublishStripeCheckoutCompletedEventValueObject } from "../../domain";
import { PublishStripeCheckoutCompletedEventRequestDTO } from "../dto";
import { PublishStripeCheckoutCompletedEventUseCase } from "./publish-stripe-checkout-completed-event.use-case.type";



export class PublishStripeCheckoutCompletedEventUseCaseImpl implements
	PublishStripeCheckoutCompletedEventUseCase {
	private _publishStripeCheckoutCompletedEventRequestDTO:
		PublishStripeCheckoutCompletedEventRequestDTO;

	set publishstripeCheckoutCompletedEventRequestDTO(
		publishstripeCheckoutCompletedEventRequestDTO:
			PublishStripeCheckoutCompletedEventRequestDTO
	) {
		this._publishStripeCheckoutCompletedEventRequestDTO =
			publishstripeCheckoutCompletedEventRequestDTO;
	}

	async execute(): Promise<void> {
		const courseRepository = getCourseFactory().make("CourseRepository") as CourseRepository;

		const publishStripeCheckoutCompletedEventValueObject =
			new PublishStripeCheckoutCompletedEventValueObject();
		publishStripeCheckoutCompletedEventValueObject.id =
			this._publishStripeCheckoutCompletedEventRequestDTO.eventId;
		publishStripeCheckoutCompletedEventValueObject.orderId =
			this._publishStripeCheckoutCompletedEventRequestDTO.orderId;
		publishStripeCheckoutCompletedEventValueObject.type =
			this._publishStripeCheckoutCompletedEventRequestDTO.type;
		publishStripeCheckoutCompletedEventValueObject.version = 1;

		await courseRepository
			.publishStripeCheckoutCompletedEvent(
				publishStripeCheckoutCompletedEventValueObject
			);
	}
}