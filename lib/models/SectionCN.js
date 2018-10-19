import sectionCNQueries from "../queries/sectionCNQueries";
import checkEntityExists from "./checkEntityExists";

function SectionCN(client) {
  const sectionCNClient = client.link(SectionCN.queries);

  const insertOne = function* insertOne(sectionCN) {
    try {
      yield client.begin();
      const insertedSectionCN = yield sectionCNClient.insertOne(sectionCN);

      yield client.commit();

      return {
        ...insertedSectionCN
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const updateOne = function*(selector, sectionCN) {
    try {
      yield client.begin();

      let updatedSectionCN;
      try {
        updatedSectionCN = yield sectionCNClient.updateOne(selector, sectionCN);
      } catch (error) {
        if (error.message !== "no valid column to set") {
          throw error;
        }
        updatedSectionCN = yield sectionCNClient.selectOne({
          id: selector
        });
      }

      yield client.commit();

      return {
        ...updatedSectionCN
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const selectByIds = function*(ids) {
    const sectionsCN = yield sectionCNClient.selectByIds(ids);
    checkEntityExists("SectionsCN", "id", ids, sectionsCN);

    return sectionsCN;
  };

  const selectByCodes = function*(codes) {
    const sections = yield sectionCNClient.selectBy(null, null, {
      code: codes
    });
    checkEntityExists("Sections", "code", codes, sections);

    return sections;
  };

  return {
    ...sectionCNClient,
    insertOne,
    updateOne,
    selectByIds,
    selectByCodes
  };
}

SectionCN.queries = sectionCNQueries;

export default SectionCN;
