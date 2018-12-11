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
      let result = yield regionalsDelegationsQueries.SelectById(
        regionalsDelegations.id
      );
      delete result[0].totalcount;
      assert.equal(result[0].id, regionalsDelegations.id);
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });
});
