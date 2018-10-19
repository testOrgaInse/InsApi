import SectionCN from "../../../lib/models/SectionCN";

describe("model SectionCN", function() {
  let sectionCNQueries;

  before(function() {
    sectionCNQueries = SectionCN(postgres);
  });

  describe("selectOne", function() {
    let primaryInstitute, secondaryInstitute, section;

    before(function*() {
      primaryInstitute = yield fixtureLoader.createInstitute({
        name: "primary",
        code: "1"
      });
      secondaryInstitute = yield fixtureLoader.createInstitute({
        name: "secondary",
        code: "2"
      });
      section = yield fixtureLoader.createSectionCN({
        name: "section",
        code: "007",
        comment: "no comment"
      });
    });

    it("should return one institute by id", function*() {
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

  describe("selectPage", function() {
    let biology, chemestry, humanity, ds50, ds51, ds52, ds53;
    before(function*() {
      [ds50, ds51, ds52, ds53] = yield ["ds50", "ds51", "ds52", "ds53"].map(
        name => fixtureLoader.createInstitute({ name, code: name })
      );

      chemestry = yield fixtureLoader.createSectionCN({
        name: "chemestry",
        code: "52",
        comment: "chemistry comment"
      });
      biology = yield fixtureLoader.createSectionCN({
        name: "biology",
        comment: "biology comment",
        code: "53"
      });
      humanity = yield fixtureLoader.createSectionCN({
        name: "humanity",
        code: "54",
        comment: "humanity comment"
      });
    });

    it("should return all institute", function*() {
      assert.deepEqual(yield sectionCNQueries.selectPage(), [
        {
          id: chemestry.id,
          totalcount: "3",
          name: "chemestry",
          code: "52",
          comment: chemestry.comment
        },
        {
          id: biology.id,
          totalcount: "3",
          name: "biology",
          code: "53",
          comment: biology.comment
        },
        {
          id: humanity.id,
          totalcount: "3",
          name: "humanity",
          code: "54",
          comment: humanity.comment
        }
      ]);
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });

  describe("updateOne", function() {
    let section, institute1, institute2, institute3;

    beforeEach(function*() {
      section = yield fixtureLoader.createSectionCN({
        name: "section"
      });
    });

    afterEach(function*() {
      yield fixtureLoader.clear();
    });
  });

  describe("insertOne", function() {
    let primary, secondary;

    beforeEach(function*() {
      [primary, secondary] = yield ["primary", "secondary"].map(name =>
        fixtureLoader.createInstitute({ name, code: name })
      );
    });

    it("should add given institutes if they exists", function*() {
      const section = yield sectionCNQueries.insertOne({
        name: "section",
        code: "53"
      });
    });

    it("should throw an error if trying to insert an sectionCN with instittue that do not exists", function*() {
      let error;
      try {
        yield sectionCNQueries.insertOne({
          name: "section",
          code: "53"
        });
      } catch (e) {
        error = e;
      }
      assert.equal(error.message, "Institutes nemo does not exists");

      const insertedSectionCN = yield postgres.queryOne({
        sql: "SELECT * from section_cn WHERE name=$name",
        parameters: { name: "section" }
      });
      assert.isUndefined(insertedSectionCN);
    });

    afterEach(function*() {
      yield fixtureLoader.clear();
    });
  });

  describe("selectByIds", function() {
    let section1, section2;

    before(function*() {
      [section1, section2] = yield ["1", "2", "3"].map(code =>
        fixtureLoader.createSectionCN({
          code,
          name: `SectionCN ${code}`
        })
      );
    });

    it("should return each sectionsCN with given ids", function*() {
      assert.deepEqual(
        yield sectionCNQueries.selectByIds([section1.id, section2.id]),
        [
          {
            id: section1.id,
            name: section1.name,
            code: section1.code
          },
          {
            id: section2.id,
            name: section2.name,
            code: section2.code
          }
        ]
      );
    });

    it("should throw an error if trying to retrieve an institute that does not exists", function*() {
      let error;

      try {
        yield sectionCNQueries.selectByIds([section1.id, section2.id, 0]);
      } catch (e) {
        error = e;
      }
      assert.equal(error.message, "SectionsCN 0 does not exists");
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });
});
