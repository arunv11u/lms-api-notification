export const devConfig = {
	port: 3000,
	mongodbURL: "mongodb+srv://cluster0.qwm8c.gcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
	mongodbDatabaseName: "lms-notification",
	messagingConsumerGroupId: "notification-service-group",
	bootstrapKafkaBroker: "my-cluster-kafka-bootstrap.default.svc.cluster.local:9092",
	mailHost: "smtp.mail.us-east-1.awsapps.com",
	mailPort: 465
};