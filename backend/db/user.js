import {mongoDriver} from "./mongoUtil.js";


export class User {
  constructor(db) {
    this.db = db
    this.collectionName = "users";
  }
  connectDb(){
    if (this.db) {
      this.collection = this.db.collection(this.collectionName);
    }
  }

  async createUser(userObj, initListsObj) {
    if (this.collection) {
      try {
        await this.collection.insertOne(userObj);
        await db.collection("lists").insertOne(initListsObj);
      } catch (error) {
        throw error;
      }
    } else return { error: "Database not accessible" };
  }

  async findUserByEmail(email) {
    if (this.collection) {
      try {
        let user = await this.collection.findOne({ email: email });
        return user;
      } catch (error) {
        throw error;
      }
    } else return { error: "Database not accessible" };
  }
  async findUserByID(userID) {
    if (this.collection) {
      try {
        let user = await this.collection.findOne({ id: userID });
        return user;
      } catch (error) {
        throw error;
      }
    } else return { error: "Database not accessible" };
  }

  async enableUser(activationKey) {
    if (this.collection) {
      try {
        await this.collection.updateOne(
          { activateKey: activationKey },
          { $set: { activated: true } }
        );
      } catch (error) {
        throw error;
      }
    } else {
      return { error: "Database not accessible" };
    }
  }
}
