import { List } from "../../../db/List";
import { TestDbHelper } from "../testUtil/helper";

const dbHelper = new TestDbHelper();

beforeAll(async () => {
  await dbHelper.start();
});

afterAll(async () => {
  await dbHelper.stop();
});

let list;
beforeEach(async () => {
  list = new List(dbHelper.db);
});

afterEach(async () => {
  await dbHelper.cleanUp();
});

describe("Find List by List ID", () => {
  test("should return the correct list by ID", async () => {
    const { lists1 } = await createSampleLists();

    const result = await list.getShoppingListsByUserID("sampleUser1");
    expect(result).toMatchObject(lists1);
  });
  test("should not find any list", async () => {
    await createSampleLists();
    const result = await list.getShoppingListsByUserID("non-excisting-ID");
    expect(result).toBeNull();
  });
});

describe("Update List (also for multiple User)", () => {
  test("2 lists should have changed", async () => {
    const newSampleList = {
      listID: "sampleList2",
      owner: "sampleUser1",
      shared: true,
      shop: "Lidl",
      color: "#ffb300",
      items: [
        {
          name: "Wein",
          amount: 1,
          id: "sampleItem4",
        },
      ],
    };
    await createSampleLists();
    const result = await list.updateShoppingList(newSampleList);
    expect(result.modifiedCount).toBe(2);
  });
  test("0 lists should have changed", async () => {
    const newSampleList = {
      listID: "non-excisting-ID",
      owner: "sampleUser1",
      shared: true,
      shop: "Lidl",
      color: "#ffb300",
      items: [
        {
          name: "Wein",
          amount: 1,
          id: "sampleItem4",
        },
      ],
    };
    await createSampleLists();
    const result = await list.updateShoppingList(newSampleList);
    expect(result.modifiedCount).toBe(0);
  });

  describe("Create a new List", () => {
    test("Insert a list", async () => {
      const { lists1 } = await createSampleLists();
      const newList = {
        listID: "sampleList5",
        owner: "sampleUser1",
        shared: true,
        shop: "TestingShop",
        color: "#ffb300",
        items: [
          {
            name: "Wein",
            amount: 1,
            id: "sampleItem4",
          },
        ],
      };
      list.createNewShoppingList(newList, lists1.userID);
      let { lists: listsArr } = await list.getShoppingListsByUserID(
        lists1.userID
      );
      listsArr = listsArr.filter((list) => list.listID === "sampleList5");
      expect(listsArr[0]).toMatchObject(newList);
    });
    test("Insert an list, but no matching user", async () => {
      const { lists2 } = await createSampleLists();
      const result = await list.createNewShoppingList(
        lists2.lists[0],
        "non-excisting-ID"
      );
      expect(result.modifiedCount).toBe(0);
    });
  });
});

describe("delete a List", () => {
  test("lists should be deleted", async () => {
    const { lists1 } = await createSampleLists();
    const deleteListID = lists1.lists[0].listID;
    await list.deleteList(deleteListID, lists1.userID);
    const { lists: listsAfterDelete } = await list.getShoppingListsByUserID(
      lists1.userID
    );
    let listArr = lists1.lists.filter((list) => list.listID !== deleteListID);
    expect(listArr).toEqual(listsAfterDelete);
  });
  test("nothing should be deleted, no matching id", async () => {
    const { lists2 } = await createSampleLists();
    const result = await list.deleteList("non-excisting-ID", lists2.userID);
    expect(result.modifiedCount).toBe(0);
  });
});

/**
 * Insert set of sample users into the database
 */

async function createSampleLists() {
  const lists1 = await dbHelper.createDoc(list.collectionName, {
    userID: "sampleUser1",
    lists: [
      {
        listID: "sampleList1",
        owner: "sampleUser1",
        shared: false,
        shop: "Rewe",
        color: "#d10000",
        items: [
          {
            name: "Korn",
            amount: 1,
            id: "sampleItem1",
          },
          {
            name: "Bier",
            amount: 5,
            id: "sampleItem2",
          },
          {
            name: "Wein",
            amount: 5,
            id: "sampleItem3",
          },
        ],
      },
      {
        listID: "sampleList2",
        owner: "sampleUser1",
        shared: true,
        shop: "Lidl",
        color: "#ffb300",
        items: [
          {
            name: "Wein",
            amount: 1,
            id: "sampleItem4",
          },
          {
            name: "Hack",
            amount: 1,
            id: "sampleItem5",
          },
          {
            name: "Wein",
            amount: 4,
            id: "sampleItem6",
          },
          {
            name: "Pilze",
            amount: 3,
            id: "sampleItem7",
          },
        ],
      },
    ],
  });
  const lists2 = await dbHelper.createDoc(list.collectionName, {
    userID: "sampleUser2",
    lists: [
      {
        listID: "sampleList3",
        owner: "sampleUser2",
        shared: false,
        shop: "Rewe",
        color: "#d10000",
        items: [
          {
            name: "Korn",
            amount: 1,
            id: "sampleItem8",
          },
          {
            name: "Bier",
            amount: 5,
            id: "sampleItem9",
          },
          {
            name: "Wein",
            amount: 5,
            id: "sampleItem10",
          },
        ],
      },
      {
        listID: "sampleList4",
        owner: "sampleUser2",
        shared: false,
        shop: "Lidl",
        color: "#ffb300",
        items: [
          {
            name: "Wein",
            amount: 1,
            id: "sampleItem11",
          },
          {
            name: "Hack",
            amount: 1,
            id: "sampleIte12",
          },
          {
            name: "Wein",
            amount: 4,
            id: "sampleItem13",
          },
          {
            name: "Pilze",
            amount: 3,
            id: "sampleItem14",
          },
        ],
      },
      {
        listID: "sampleList2",
        owner: "sampleUser1",
        shared: true,
        shop: "Lidl",
        color: "#ffb300",
        items: [
          {
            name: "Wein",
            amount: 1,
            id: "sampleItem4",
          },
          {
            name: "Hack",
            amount: 1,
            id: "sampleItem5",
          },
          {
            name: "Wein",
            amount: 4,
            id: "sampleItem6",
          },
          {
            name: "Pilze",
            amount: 3,
            id: "sampleItem7",
          },
        ],
      },
    ],
  });
  return { lists1, lists2 };
}
