import { getCourseFactory } from "../../../global-config";
import {
	CourseRepository,
	PublishCourseTranscodingCompletedEventPayloadValueObject,
	PublishCourseTranscodingCompletedEventValueObject
} from "../../domain";
import { PublishCourseTranscodingCompletedEventRequestDTO } from "../dto";
import { PublishCourseTranscodingCompletedEventUseCase } from "./publish-course-transcoding-completed-event.use-case.type";



export class PublishCourseTranscodingCompletedEventUseCaseImpl implements
	PublishCourseTranscodingCompletedEventUseCase {
	private _publishCourseTranscodingCompletedEventRequestDTO:
		PublishCourseTranscodingCompletedEventRequestDTO;

	set publishCourseTranscodingCompletedEventRequestDTO(
		publishCourseTranscodingCompletedEventRequestDTO:
			PublishCourseTranscodingCompletedEventRequestDTO
	) {
		this._publishCourseTranscodingCompletedEventRequestDTO =
			publishCourseTranscodingCompletedEventRequestDTO;
	}

	async execute(): Promise<void> {
		const courseRepository = getCourseFactory().make("CourseRepository") as CourseRepository;

		const publishCourseTranscodingCompletedEventValueObject =
			new PublishCourseTranscodingCompletedEventValueObject();

		publishCourseTranscodingCompletedEventValueObject.messageId =
			this._publishCourseTranscodingCompletedEventRequestDTO.messageId;

		this._publishCourseTranscodingCompletedEventRequestDTO
			.payload.forEach(payload => {
				// eslint-disable-next-line max-len
				const publishCourseTranscodingCompletedEventPayloadValueObject =
					// eslint-disable-next-line max-len
					new PublishCourseTranscodingCompletedEventPayloadValueObject();

				publishCourseTranscodingCompletedEventPayloadValueObject
					.duration = payload.duration;
				publishCourseTranscodingCompletedEventPayloadValueObject
					.key = payload.key;
				publishCourseTranscodingCompletedEventPayloadValueObject
					.lectureId = payload.lectureId;
				publishCourseTranscodingCompletedEventPayloadValueObject
					.playlistName = payload.playlistName;
				publishCourseTranscodingCompletedEventPayloadValueObject
					.status = payload.status;
				publishCourseTranscodingCompletedEventPayloadValueObject
					.thumbnailPattern = payload.thumbnailPattern;

				publishCourseTranscodingCompletedEventValueObject.payload
					.push(
						publishCourseTranscodingCompletedEventPayloadValueObject
					);
			});

		await courseRepository
			.publishCourseTranscodingCompletedEvent(
				publishCourseTranscodingCompletedEventValueObject
			);
	}
}