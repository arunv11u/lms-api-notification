/* eslint-disable max-classes-per-file */
import Mail from "nodemailer/lib/mailer";
import { Readable } from "nodemailer/lib/xoauth2";


enum TemplateFolderNames {
	test = "test",
	sendForgotPasswordEmailForStudent = "send-forgot-password-email-for-student"
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
	TemplateTypes,
	MailMessageFrom,
	MailMessageTo,
	MailMessage,
};