import { MongoMemoryServer } from "mongodb-memory-server";

export default async () => {
    const mongod = await MongoMemoryServer.create();
    return mongod.getUri();
};