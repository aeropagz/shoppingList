import db from "../../db";
import { User } from "../../db/User";
import { TestDbHelper } from "../testUtil/helper";

const dbHelper = new TestDbHelper();

beforeAll(async () => {
  dbHelper.start();
});

afterAll(async () => {
  dbHelper.stop();
});

let user;
beforeEach(async () => {
  user = new User(dbHelper.db);
});

afterEach(async () => {
  await dbHelper.cleanUp();
});


async function createSampleUsers(){
  const user1 = await dbHelper.createDoc()
}