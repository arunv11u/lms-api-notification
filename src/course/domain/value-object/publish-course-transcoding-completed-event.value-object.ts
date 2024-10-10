/* eslint-disable max-classes-per-file */

class PublishCourseTranscodingCompletedEventPayloadValueObject {
	duration: number;
	key: string;
	playlistName: string;
	status: string;
	thumbnailPattern: string;
	lectureId: string;
}

class PublishCourseTranscodingCompletedEventValueObject {
	messageId: string;
	payload: PublishCourseTranscodingCompletedEventPayloadValueObject[] = [];
}

export {
	PublishCourseTranscodingCompletedEventPayloadValueObject,
	PublishCourseTranscodingCompletedEventValueObject
};