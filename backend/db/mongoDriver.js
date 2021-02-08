import mongodb from "mongodb";
import { User } from "./User.js";
import { List } from "./List.js";

const { MongoClient } = mongodb;

class MongoDriver {
  constructor(url) {
    this.url = url;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;
  }
  async connectToServer() {
    console.log("Try connect DB");
    console.log(this.url);
    try {
      await this.client.connect();
      this.db = this.client.db();
      console.log("DataBase connected.");
      this.user = new User(this.db);
      this.list = new List(this.db);
    } catch (err) {
      console.log("DataBase connection failed." + err);
      return err;
    }
  }
}

export { MongoDriver };
