import db from "../../../db";
import { TestDbHelper } from "../helper";

const dbHelper = new TestDbHelper();

beforeAll(async () => {
  dbHelper.start();
});

afterAll(async () => {
  dbHelper.stop();
});

afterEach(async () => {
  await dbHelper.cleanUp();
});
