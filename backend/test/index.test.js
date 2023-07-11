const { getCsvData } = require("../controllers/csvControllers");
var assert = require('assert');

describe("User Service Unit Tests", function () {
  describe("Get CSV Data functionality", function () {
    it("should successfully return data of all users from csv", async function () {
        
      const returnedData = await getCsvData();

      assert(Array.isArray(returnedData),true);
      returnedData.map((user, index) => {
        assert(user instanceof Object, true);
        assert(user.hasOwnProperty('ID'), true);
        assert(user.hasOwnProperty('First Name'), true);
        assert(user.hasOwnProperty('Last Name'), true);
        assert(user.hasOwnProperty('Email'), true);
        assert(user.hasOwnProperty('Age'), true);
        assert(user.hasOwnProperty('State'), true);
      })
    });
  });
});