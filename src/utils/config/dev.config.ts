export const devConfig = {
	port: 3000,
	messagingConsumerGroupId: "notification-service-group",
	bootstrapKafkaBroker: "my-cluster-kafka-bootstrap.default.svc.cluster.local:9092",
	mailHost: "smtp.mail.us-east-1.awsapps.com",
	mailPort: 465,
	mailUserAlias: "Learning Management System"
};