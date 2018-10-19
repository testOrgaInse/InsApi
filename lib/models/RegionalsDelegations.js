import regionalsDelegationsQueries from "../queries/regionalsDelegationsQueries";
import checkEntityExists from "./checkEntityExists";

function RegionalsDelegations(client) {
  const regionalsDelegationsClient = client.link(RegionalsDelegations.queries);

  const insertOne = function* insertOne(regionalsDelegations) {
    try {
      yield client.begin();
      yield regionalsDelegationsClient.insertOne(regionalsDelegations);

      yield client.commit();

      return {
        ...regionalsDelegations
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const updateOne = function*(selector, sectionCN) {
    try {
      yield client.begin();

      let updatedRegionalsDelegations;
      try {
        updatedRegionalsDelegations = yield regionalsDelegationsClient.updateOne(
          selector,
          sectionCN
        );
      } catch (error) {
        if (error.message !== "no valid column to set") {
          throw error;
        }
        updatedRegionalsDelegations = yield regionalsDelegationsClient.selectOne(
          {
            id: selector
          }
        );
      }

      yield client.commit();

      return {
        ...updatedRegionalsDelegations
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const selectByIds = function*(ids) {
    const regionalsDelegations = yield regionalsDelegationsClient.selectByIds(
      ids
    );
    checkEntityExists("RegionalsDelegations", "id", ids, regionalsDelegations);

    return regionalsDelegations;
  };

  const selectByName = function*(name) {
    const regionalsDelegations = yield regionalsDelegationsClient.selectBy(
      null,
      null,
      {
        name
      }
    );
    checkEntityExists("RegionalsDelegations", "name", regionalsDelegations);

    return regionalsDelegations;
  };

  return {
    ...regionalsDelegationsClient,
    insertOne,
    updateOne,
    selectByIds,
    selectByName
  };
}

RegionalsDelegations.queries = regionalsDelegationsQueries;

export default RegionalsDelegations;
