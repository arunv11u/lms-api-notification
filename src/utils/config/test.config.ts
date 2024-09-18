import path from "path";
import { Environment } from "../types";


export const testConfig = {
	NODE_ENV: Environment.TEST,
	combinedLogPath: path.join(__dirname, "../", "logs/combined.log"),
	errorLogPath: path.join(__dirname, "../", "logs/error.log"),
	mailClientHost: "smtp.mail.us-east-1.awsapps.com",
	mailClientPort:	"465",
	mailClientUser:	"noreply@lms-staging.com",
	mailClientPassword:	""
};