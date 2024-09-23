import { MessagingTopics } from "../../../../utils";


export interface StudentWelcomeEmailEvent {
	topic: MessagingTopics.studentWelcomeEvent;
	data: {
		id: string;
		userId: string;
		firstName: string;
		lastName: string;
		email: string;
		version: number;
	};
}