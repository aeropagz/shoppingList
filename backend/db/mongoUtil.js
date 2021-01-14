import mongodb from "mongodb";

const { MongoClient } = mongodb;
const host = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
const port = process.env.DB_PORT ? process.env.DB_PORT : "27017";
const dbName = process.env.DB_NAME ? process.env.DB_NAME : "shopping";
const username = process.env.DB_USER || "shoppingAdmin";
const password = process.env.DB_PASS || "shoppingAdminPass";

// Connection URL
const url = `mongodb://${username}:${password}@${host}:${port}/${dbName}`;

class MongoDriver {
  constructor(url) {
    this.url = url;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;
  }
  async connectToServer() {
    console.log("Try connect DB");
    console.log(url);
    try {
      await this.client.connect();
      this.db = this.client.db();
      console.log("DataBase connected.");
    } catch (err) {
      console.log("DataBase connection failed." + err);
      return err;
    }
  }
  getDb() {
    return this._db;
  }
}
let mongoDriver = new MongoDriver(url);
mongoDriver.connectToServer();

export { mongoDriver };
