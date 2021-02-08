import { MongoClient } from "mongodb";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

export class TestDbHelper {
  constructor() {
    this.db = null;
    this.username = "testUser";
    this.password = "testPass";
    this.host = "localhost";
    this.port = 27017;
    this.dbName = "test";
    this.url = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.dbName}`;
    this.connection = null;
  }

  async start() {
    this.connection = await MongoClient.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.connection.db(this.dbName);
  }

  async stop() {
    this.connection.close();
  }

  async cleanUp() {
    const collections = await this.db.listCollections().toArray();

    return Promise.all(
      collections
        .map(({ name }) => name)
        .map(async (collection) => {
          await this.db.collection(collection).drop();
        })
    );
  }

  async createDoc(collectionName, document) {
    const { ops } = await this.db
      .collection(collectionName)
      .insertOne(document);
    return ops[0];
  }
}
