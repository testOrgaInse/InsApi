import RegionalsDelegations from "../../../lib/models/RegionalsDelegations";

describe("model RegionalsDelegations", function() {
  let regionalsDelegationsQueries;

  before(function() {
    regionalsDelegationsQueries = RegionalsDelegations(postgres);
  });

  describe("Authenticate", function() {
    it("should return regionalsDelegations if given good id", function*() {
      const regionalsDelegations = yield fixtureLoader.createRegionalsDelegations(
        {
          name: "Patrick",
          code: "Sebastien"
        }
      );
      console.log("check result");
      console.log(regionalsDelegations);
      let result = yield regionalsDelegationsQueries.SelectById(
        regionalsDelegations.id
      );
      delete result[0].totalcount;
      console.log(result[0]);
      assert.equal(result[0].id, regionalsDelegations.id);
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });
});
