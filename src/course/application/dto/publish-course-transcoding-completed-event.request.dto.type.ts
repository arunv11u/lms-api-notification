
interface PublishCourseTranscodingCompletedEventPayloadRequestDTO {
	duration: number;
	key: string;
	playlistName: string;
	status: string;
	thumbnailPattern: string;
	lectureId: string;
}

interface PublishCourseTranscodingCompletedEventRequestDTO {
	messageId: string;
	payload: PublishCourseTranscodingCompletedEventPayloadRequestDTO[];
}

export {
	PublishCourseTranscodingCompletedEventPayloadRequestDTO,
	PublishCourseTranscodingCompletedEventRequestDTO
};