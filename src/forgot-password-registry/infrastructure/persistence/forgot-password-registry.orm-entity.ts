import { UserTypes } from "../../../utils";


export class ForgotPasswordRegistryORMEntity {
	_id: string;
	userId: string;
	userType: UserTypes;
	email: string;
	version: number;
}