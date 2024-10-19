import { UseCase } from "../../../utils";
import { PublishStripeCheckoutCompletedEventRequestDTO } from "../dto";


export abstract class PublishStripeCheckoutCompletedEventUseCase implements
	UseCase {
	abstract set publishstripeCheckoutCompletedEventRequestDTO(
		publishstripeCheckoutCompletedEventRequestDTO:
			PublishStripeCheckoutCompletedEventRequestDTO
	);

	abstract execute(): Promise<void>;
}