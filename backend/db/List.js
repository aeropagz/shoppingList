export class List {
  constructor(db) {
    this.collectionName = "lists";
    this.collection = db.collection(this.collectionName);
  }

  async getShoppingListsByUserID(userID) {
    if (this.collection) {
      try {
        return await this.collection.findOne({ userID: userID });
      } catch (error) {
        throw error;
      }
    } else {
      return { error: "Database not accessible" };
    }
  }

  async updateShoppingList(list) {
    if (this.collection) {
      try {
        return await this.collection.updateMany(
          { "lists.listID": list.listID },
          { $set: { "lists.$": list } }
        );
      } catch {
        throw error;
      }
    } else {
      return { error: "Database not accessible" };
    }
  }

  async createNewShoppingList(list, userID) {
    if (this.collection) {
      try {
        return await this.collection.updateOne(
          { userID: userID },
          { $addToSet: { lists: list } }
        );
      } catch {
        throw error;
      }
    } else {
      return { error: "Database not accessible" };
    }
  }

  async deleteList(listID, userID) {
    if (this.collection) {
      try {
        return await this.collection.updateOne(
          { userID: userID },
          { $pull: { lists: { listID: listID } } }
        );
      } catch {
        throw error;
      }
    }
  }

  async getUserByListID(givenID) {
    if (this.collection) {
      try {
        const user = await this.collection.findOne({ "lists.listID": givenID });
        return user;
      } catch (error) {
        throw error;
      }
    }
  }
}
