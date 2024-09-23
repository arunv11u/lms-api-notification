/* eslint-disable max-classes-per-file */
import Mail from "nodemailer/lib/mailer";
import { Readable } from "nodemailer/lib/xoauth2";


enum TemplateFolderNames {
	test = "test",
	sendForgotPasswordEmailForStudent = "send-forgot-password-email-for-student",
	welcomEmailForStudent = "welcome-email-for-student"
}

enum EmailTypes {
	forgotPassword = "FORGOT_PASSWORD",
	welcomEmail = "WELCOME_EMAIL"
}

enum TemplateTypes {
	html = "HTML",
	subject = "SUBJECT",
	text = "TEXT"
}

class MailMessageFrom {
	address: string;
	name: string;
}

class MailMessageTo {
	address: string;
	name: string;
}

class MailMessage {
	from: string | MailMessageFrom;
	to: string | MailMessageTo | (string | MailMessageTo)[];
	subject: string;
	html: string | Buffer | Readable | Mail.AttachmentLike;
	text: string | Buffer | Readable | Mail.AttachmentLike;
	attachments: Mail.Attachment[];
	cc: string | Mail.Address | (string | Mail.Address)[];

	constructor(
		from: string | MailMessageFrom,
		to: string | MailMessageTo | (string | MailMessageTo)[]
	) {
		this.from = from;
		this.to = to;
	}
}

export {
	TemplateFolderNames,
	EmailTypes,
	TemplateTypes,
	MailMessageFrom,
	MailMessageTo,
	MailMessage,
};