import * as mongodb from "mongodb";

const { MongoClient } = mongodb;
const host = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
const port = process.env.DB_PORT ? process.env.DB_PORT : "27017";
const dbName = process.env.DB_NAME ? process.env.DB_NAME : "shopping";
const username = process.env.DB_USER || "shoppingAdmin";
const password = process.env.DB_PASS || "shoppingAdminPass";

// Connection URL
const url = `mongodb://${username}:${password}@${host}:${port}/${dbName}`;
let _db;

const connectToServer = async () => {
  console.log("Try connect DB");
  console.log(url);
  try {
    if (_db) {
      return _db;
    }
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    _db = client.db(dbName);
    console.log("DataBase connected.");
    return _db;
  } catch (err) {
    console.log("DataBase connection failed." + err);
    return err;
  }
};

const getDb = () => {
  if (!_db) {
    connectToServer();
  }
  return _db;
};

const getMongoConfig = () => {
  return { host, port, dbName, collectionName };
};

export { connectToServer, getDb, getMongoConfig };
