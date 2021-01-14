import { List } from "./List.js";
import { User } from "./User.js";

const db = {
  user: new User({}),
  list: new List({}),
};

export { db };
