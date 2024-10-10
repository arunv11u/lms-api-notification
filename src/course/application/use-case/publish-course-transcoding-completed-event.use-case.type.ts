import { UseCase } from "../../../utils";
import { PublishCourseTranscodingCompletedEventRequestDTO } from "../dto";


export abstract class PublishCourseTranscodingCompletedEventUseCase implements
	UseCase {
	abstract set publishCourseTranscodingCompletedEventRequestDTO(
		publishCourseTranscodingCompletedEventRequestDTO:
			PublishCourseTranscodingCompletedEventRequestDTO
	);

	abstract execute(): Promise<void>;
}