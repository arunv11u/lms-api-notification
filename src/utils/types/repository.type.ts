import { MongoDBRepository } from "@arunvaradharajalu/common.mongodb-api";


export abstract class Repository {
	abstract set mongoDBRepository(mongoDBRepository: MongoDBRepository);
}