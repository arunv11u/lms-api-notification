import { MessagingTopics } from "../../../../utils";

interface CourseTranscodingCompletedEventPayload {
	duration: number;
	lectureId: string;
	key: string;
	playlistName: string;
	status: string;
	thumbnailPattern: string;
}

interface CourseTranscodingCompletedEvent {
	topic: MessagingTopics.courseTranscodingCompletedEvent;
	data: {
		id: string;
		payload: CourseTranscodingCompletedEventPayload[];
	};
}

export {
	CourseTranscodingCompletedEvent
};