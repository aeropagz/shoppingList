import { MongoDriver } from "./mongoDriver.js";

let db;
const initDb = async function () {
  const host = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
  const port = process.env.DB_PORT ? process.env.DB_PORT : "27017";
  const dbName = process.env.DB_NAME ? process.env.DB_NAME : "shopping";
  const username = process.env.DB_USER || "shoppingAdmin";
  const password = process.env.DB_PASS || "shoppingAdminPass";

  const url = `mongodb://${username}:${password}@${host}:${port}/${dbName}`;
  db = new MongoDriver(url);
  await db.connectToServer();
};
export { db, initDb };
