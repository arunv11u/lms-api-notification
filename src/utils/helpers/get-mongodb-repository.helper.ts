import { MongoDBRepositoryImpl, mongoDBConnect } from "@arunvaradharajalu/common.mongodb-api";



function getMongoDBRepository() {
	const mongoDBRepository = new MongoDBRepositoryImpl(
		mongoDBConnect,
		mongoDBConnect.dbContext
	);

	return mongoDBRepository;
}

export {
	getMongoDBRepository
};