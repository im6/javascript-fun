const sqlExecOne = require("mysql-client");
const runSite = require("./site");

jest.mock("mysql-client");

describe("Testing site query functionality", () => {
  test("make success sql query", () => {
    sqlExecOne.mockImplementation((query, cb) => {
      if (/SELECT \* FROM category/.test(query)) {
        cb(null, [
          {
            id: 1,
            name: "famous web",
            page: 4,
            sort: 1,
          },
        ]);
      } else if (/SELECT \* FROM site where grp is NOT NULL/.test(query)) {
        cb(null, [
          {
            id: 1,
            name: "cnn",
            desc: "cnn news",
            url: "www.cnn.com",
            grp: 1,
          },
        ]);
      }
    });
    runSite((err) => {
      expect(err).toBe(null);
    });
  });
  test("make failure sql query", () => {
    sqlExecOne.mockImplementation((qry, cb) => {
      cb(true);
    });
    runSite((err) => {
      expect(err).toBe(true);
    });
  });
});
