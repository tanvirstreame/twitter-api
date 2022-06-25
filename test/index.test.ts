const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

/**
 * Connect to the in-memory database.
 */
 var mongod: any;

const connect = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri();
    await mongoose.connect(uri);
}

/**
 * Drop database, close the connection and stop mongod.
 */

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */

const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}


/**
 * Connect to a new in-memory database before running any tests.
 */

 before(async () => await connect());

 /**
  * Clear all test data after every test.
  */
 afterEach(async () => await clearDatabase());
 
 /**
  * Remove and close the db and server.
  */
 after(async () => await closeDatabase());
 