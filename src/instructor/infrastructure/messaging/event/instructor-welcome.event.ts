import { MessagingTopics } from "../../../../utils";


export interface InstructorWelcomeEmailEvent {
	topic: MessagingTopics.instructorWelcomeEvent;
	data: {
		id: string;
		userId: string;
		firstName: string;
		lastName: string;
		email: string;
		version: number;
	};
}