const MongoClient = require("mongodb").MongoClient;
let host = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
let port = process.env.DB_PORT ? process.env.DB_PORT : "27017";
let dbName = process.env.DB_NAME ? process.env.DB_NAME : "shopping";

// Connection URL
const url =
  "mongodb://shoppingAdmin:shoppingAdminPass@" +
  host +
  ":" +
  port +
  "/" +
  dbName;
let _db;

async function connectToServer() {
  console.log("try connect DB");
  try {
    if (_db) {
      console.log("db");
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
}

const getDb = () => {
  return _db;
};

const getMongoConfig = () => {
  return { host, port, dbName, collectionName };
};

module.exports = {
  connectToServer,
  getDb,
  getMongoConfig,
};
