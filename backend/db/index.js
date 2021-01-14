import { List } from "./List.js";
import { User } from "./User.js";
import { mongoDriver } from "./mongoUtil.js";

const db = {
  user: new User(mongoDriver.getDb()).connectDb(),
  list: new List(mongoDriver.getDb()).connectDb(),
};

console.log("check", mongoDriver.getDb());
export { db };
