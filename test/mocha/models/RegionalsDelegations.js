import RegionalsDelegations from "../../../lib/models/RegionalsDelegations";

describe("model RegionalsDelegations", function() {
  let regionalsDelegationsQueries;

  before(function() {
    regionalsDelegationsQueries = RegionalsDelegations(postgres);
  });

  describe("Authenticate", function() {
    let regionalsDelegations;

    before(function*() {
      regionalsDelegations = yield fixtureLoader.createRegionalsDelegations({
        name: "john",
        director: "lennon",
        code: "secret"
      });
    });

    it("should return user if given good name", function*() {
      let result = yield adminUserQueries.selectOne({
        name: regionalsDelegations.name
      });
      assert.equal(result.username, "john");
    });

    it("should return false if given wrong name", function*() {
      let result = yield adminUserQueries.selectOne({
        name: "jesus"
      });

      assert.isNull(result);
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });

  describe("update", function() {
    let regionalsDelegations;

    before(function*() {
      regionalsDelegations = yield fixtureLoader.createRegionalsDelegations({
        name: "john",
        director: "lennon",
        code: "secret"
      });
    });

    it("should update regionalsDelegations", function*() {
      yield adminUserQueries.updateOne(regionalsDelegations.id, {
        name: "lucas"
      });

      const updatedUser = yield regionalsDelegations.selectOne({
        name: "lucas"
      });

      assert.deepEqual(updatedUser, {
        ...adminUser,
        name: "lucas"
      });
    });

    afterEach(function*() {
      yield fixtureLoader.clear();
    });
  });
});
