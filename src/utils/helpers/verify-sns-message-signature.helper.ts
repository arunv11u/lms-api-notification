import crypto from "crypto";
import { AxiosImpl } from "@arunvaradharajalu/common.axios";
import { winstonLogger } from "../winston";


function buildStringToSign(message: Record<string, string>) {
	let stringToSign = "";

	if (message.Type === "Notification") {
		stringToSign += "Message\n" + message.Message + "\n";
		stringToSign += "MessageId\n" + message.MessageId + "\n";
		if (message.Subject) {
			stringToSign += "Subject\n" + message.Subject + "\n";
		}
		stringToSign += "Timestamp\n" + message.Timestamp + "\n";
		stringToSign += "TopicArn\n" + message.TopicArn + "\n";
		stringToSign += "Type\n" + message.Type + "\n";
	} else if (message.Type === "SubscriptionConfirmation" || message.Type === "UnsubscribeConfirmation") {
		stringToSign += "Message\n" + message.Message + "\n";
		stringToSign += "MessageId\n" + message.MessageId + "\n";
		stringToSign += "SubscribeURL\n" + message.SubscribeURL + "\n";
		stringToSign += "Timestamp\n" + message.Timestamp + "\n";
		stringToSign += "Token\n" + message.Token + "\n";
		stringToSign += "TopicArn\n" + message.TopicArn + "\n";
		stringToSign += "Type\n" + message.Type + "\n";
	}

	return stringToSign;
}

async function fetchSigningCert(certURL: string) {
	try {
		const axios = new AxiosImpl();
		const response = await axios.get(certURL);

		return response.data;
	} catch (error) {
		winstonLogger.winston.error("Error fetching the certificate while verifying sns message signature");

		throw error;
	}
}

async function verifySNSMessageSignature(snsMessage: Record<string, string>) {
	try {
		const signingCert = await fetchSigningCert(snsMessage.SigningCertURL);
		const stringToSign = buildStringToSign(snsMessage);

		const verifier = crypto.createVerify("SHA1");
		verifier.update(stringToSign, "utf8");

		const signature = Buffer.from(snsMessage.Signature, "base64");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const isVerified = verifier.verify(signingCert as any, signature);

		return isVerified;
	} catch (error) {
		winstonLogger.winston.error("Error verifying SNS message signature");

		return false;
	}
}

export {
	verifySNSMessageSignature
};
