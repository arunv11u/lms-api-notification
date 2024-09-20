import nconf from "nconf";
import {
	getMailClient,
	MailClient,
	MailMessage,
	TemplateFolderNames,
	TemplateTypes
} from "../../../utils";


class EmailRepositoryImpl {
	private _mailClient: MailClient;

	constructor() {
		this._mailClient = getMailClient();
	}

	// eslint-disable-next-line max-params
	async sendForgotPasswordEmailForStudent(
		firstName: string,
		email: string,
		verificationCode: string
	) {
		const templateFolderName =
			TemplateFolderNames.sendForgotPasswordEmailForStudent;
		const data = {
			firstName,
			verificationCode
		};

		const recipient = email;
		const mailMessage = new MailMessage(
			{ address: nconf.get("MAIL_USER"), name: nconf.get("mailUserAlias") },
			recipient
		);

		const html = await this._getCompiledTemplate(
			templateFolderName,
			TemplateTypes.html,
			data
		);

		const subject = await this._getCompiledTemplate(
			templateFolderName,
			TemplateTypes.subject
		);

		const text = await this._getCompiledTemplate(
			templateFolderName,
			TemplateTypes.text,
			data
		);

		// eslint-disable-next-line no-console
		console.log("sendForgotPasswordEmailForStudent :: data ::", data);

		await this._mailClient
			.sendMail(
				mailMessage,
				html,
				subject,
				text
			);
	}

	private async _getCompiledTemplate(
		folderName: TemplateFolderNames,
		type: TemplateTypes,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data?: { [key: string]: any; }
	) {
		const templateString = await this._mailClient
			.getTemplateString(folderName, type);

		if (!data) return templateString;

		return this._mailClient.compile(templateString, data);
	}
}

export {
	EmailRepositoryImpl
};