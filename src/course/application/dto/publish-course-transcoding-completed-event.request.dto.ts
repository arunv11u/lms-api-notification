/* eslint-disable max-classes-per-file */
import {
	PublishCourseTranscodingCompletedEventPayloadRequestDTO,
	PublishCourseTranscodingCompletedEventRequestDTO
} from "./publish-course-transcoding-completed-event.request.dto.type";

class PublishCourseTranscodingCompletedEventPayloadRequestDTOImpl implements 
	PublishCourseTranscodingCompletedEventPayloadRequestDTO {
	duration: number;
	key: string;
	lectureId: string;
	playlistName: string;
	status: string;
	thumbnailPattern: string;
}

class PublishCourseTranscodingCompletedEventRequestDTOImpl implements
	PublishCourseTranscodingCompletedEventRequestDTO {
	messageId: string;
	payload: PublishCourseTranscodingCompletedEventPayloadRequestDTO[] = [];
}

export {
	PublishCourseTranscodingCompletedEventPayloadRequestDTOImpl,
	PublishCourseTranscodingCompletedEventRequestDTOImpl
};