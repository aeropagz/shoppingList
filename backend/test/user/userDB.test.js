import { User } from "../../db/User";
import { TestDbHelper } from "../testUtil/helper";
import bycrypt from "bcryptjs";

const dbHelper = new TestDbHelper();

beforeAll(async () => {
  await dbHelper.start();
});

afterAll(async () => {
  await dbHelper.stop();
});

let user;
beforeEach(async () => {
  user = new User(dbHelper.db);
});

afterEach(async () => {
  await dbHelper.cleanUp();
});

describe("Find by ID", () => {
  test("should return the correct document by ID", async () => {
    const { user1 } = await createSampleUsers();
    const result = await user.findUserByID("sampleID1");
    expect(result).toMatchObject(user1);
  });
  test("should not find any user", async () => {
    const result = await user.findUserByID("randomString");
    expect(result).toBeNull();
  });
});

describe("Find by Email", () => {
  test("should return the correct document by Email", async () => {
    const { user4 } = await createSampleUsers();
    const result = await user.findUserByEmail("malody@test.de");
    expect(result).toMatchObject(user4);
  });
  test("should not find any user", async () => {
    const result = await user.findUserByEmail("example@test.de");
    expect(result).toBeNull();
  });
});

describe("Activate Users", () => {
  test("should activate the correct user", async () => {
    await createSampleUsers();
    await user.enableUser("sampleKey3");
    const result = await user.findUserByID("sampleID3");
    expect(result.activated).toBeTruthy();
  });
});

/**
 * Insert set of sample users into the database
 */

async function createSampleUsers() {
  const user1 = await dbHelper.createDoc(user.collectionName, {
    id: "sampleID1",
    activated: false,
    activateKey: "sampleKey1",
    name: "Alice",
    password: await bycrypt.hash("samplePass1", 1),
    role: "customer",
    email: "alice@test.de",
  });

  const user2 = await dbHelper.createDoc(user.collectionName, {
    id: "sampleID2",
    activated: false,
    activateKey: "sampleKey2",
    name: "Bob",
    password: await bycrypt.hash("samplePass2", 1),
    role: "customer",
    email: "bob@test.de",
  });
  const user3 = await dbHelper.createDoc(user.collectionName, {
    id: "sampleID3",
    activated: false,
    activateKey: "sampleKey3",
    name: "Eve",
    password: await bycrypt.hash("samplePass3", 1),
    role: "customer",
    email: "eve@test.de",
  });
  const user4 = await dbHelper.createDoc(user.collectionName, {
    id: "sampleID4",
    activated: false,
    activateKey: "sampleKey4",
    name: "Malody",
    password: await bycrypt.hash("samplePass4", 1),
    role: "customer",
    email: "malody@test.de",
  });
  return { user1, user2, user3, user4 };
}
