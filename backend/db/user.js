import { mongoDriver } from "./mongoDriver.js";

export class User {
  constructor(db) {
    this.collectionName = "users";
    this.collection = db.collection(this.collectionName);
  }

  async createUser(userObj) {
    if (this.collection) {
      try {
        await this.collection.insertOne(userObj);
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
