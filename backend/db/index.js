import { MongoDriver } from "./mongoDriver.js";

let db;
const initDb = async function (
  dbName = "shopping",
  dbUser = "shoppingAdmin",
  dbPass = "shoppingAdminPass"
) {
  const host = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
  const port = process.env.DB_PORT ? process.env.DB_PORT : "27017";
  const databaseName = process.env.DB_NAME ? process.env.DB_NAME : dbName;
  const username = process.env.DB_USER || dbUser;
  const password = process.env.DB_PASS || dbPass;

  const url = `mongodb://${username}:${password}@${host}:${port}/${databaseName}`;
  db = new MongoDriver(url);
  await db.connectToServer();
};
const closeDb = () => {
  db.stop();
};
export { db, initDb, closeDb };
