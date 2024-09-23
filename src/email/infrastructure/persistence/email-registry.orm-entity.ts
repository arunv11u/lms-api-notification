import { EmailTypes, UserTypes } from "../../../utils";

export class EmailRegistryORMEntity {
	_id: string;
	emailType: EmailTypes;
	userId: string;
	userType: UserTypes;
	email: string;
	version: number;
}