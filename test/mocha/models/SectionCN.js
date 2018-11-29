import SectionCN from "../../../lib/models/SectionCN";

describe("model SectionCN", function() {
  let sectionCNQueries;

  before(function() {
    sectionCNQueries = SectionCN(postgres);
  });

  describe("selectOne", function() {
    it("should return one institute by id", function*() {
      const section = yield fixtureLoader.createSectionCN({
        name: "section",
        code: "007",
        comment: "no comment"
      });
      assert.deepEqual(yield sectionCNQueries.selectOne({ id: section.id }), {
        id: section.id,
        name: "section",
        code: "007",
        comment: "no comment"
      });
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });
});
