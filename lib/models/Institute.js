import instituteQueries from "../queries/instituteQueries";
import checkEntityExists from "./checkEntityExists";

function Institute(client) {
  const instituteClient = client.link(Institute.queries);

  const selectByJanusAccountId = function*(userId) {
    return yield instituteClient.selectByJanusAccountId(
      null,
      null,
      { janus_account_id: userId },
      "index",
      "ASC"
    );
  };

  const selectByInistAccountId = function*(inistAccountId) {
    return yield instituteClient.selectByInistAccountId(
      null,
      null,
      { inist_account_id: inistAccountId },
      "index",
      "ASC"
    );
  };

  const selectByUnitId = function*(unitId) {
    return yield instituteClient.selectByUnitId(
      null,
      null,
      { unit_id: unitId },
      "index",
      "ASC"
    );
  };

  const insertOne = function* insertOne(institute) {
    try {
      yield client.begin();
      console.log(institute);
      const insertedInstitute = yield instituteClient.insertOne(institute);

      yield client.commit();

      return {
        ...insertedInstitute
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const updateOne = function*(selector, institute) {
    try {
      yield client.begin();

      let updatedInstitute;
      try {
        updatedInstitute = yield instituteClient.updateOne(selector, institute);
      } catch (error) {
        if (error.message !== "no valid column to set") {
          throw error;
        }
        updatedInstitute = yield instituteClient.selectOne({
          id: selector
        });
      }

      yield client.commit();

      return {
        ...updatedInstitute
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const selectByIds = function*(ids) {
    const institutes = yield instituteClient.selectByIds(ids);
    checkEntityExists("Institutes", "id", ids, institutes);

    return institutes;
  };

  function* insertInstituteIfNotExists(code, name) {
    if (!code) {
      return null;
    }
    let institute = yield instituteClient.selectOneByCode({ code });
    if (institute) {
      return institute;
    }

    return yield insertOne({ code, name });
  }

  return {
    ...instituteClient,
    selectByJanusAccountId,
    selectByInistAccountId,
    selectByUnitId,
    insertOne,
    updateOne,
    selectByIds,
    insertInstituteIfNotExists
  };
}

Institute.queries = instituteQueries;

export default Institute;
