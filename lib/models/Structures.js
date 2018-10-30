import structuresQueries from "../queries/structuresQueries";
import Community from "./Community";
import Institute from "./Institute";
import SectionCN from "./SectionCN";
import StructuresCommunity from "./StructuresCommunity";
import StructuresInstitute from "./StructuresInstitute";
import StructuresSectionCN from "./StructuresSectionCN";
import entityAssigner from "./entityAssigner";
import checkEntityExists from "./checkEntityExists";

function Structures(client) {
  const structuresClient = client.link(Structures.queries);
  const communityQueries = Community(client);
  const instituteQueries = Institute(client);
  const sectionCNQueries = SectionCN(client);
  const structuresCommunityQueries = StructuresCommunity(client);
  const structuresInstituteQueries = StructuresInstitute(client);
  const StructuresSectionCNQueries = StructuresSectionCN(client);

  const updateCommunities = entityAssigner(
    communityQueries.selectByIds,
    communityQueries.selectByStructuresId,
    structuresCommunityQueries.unassignCommunityFromStructures,
    structuresCommunityQueries.assignCommunityToStructures
  );

  const updateInstitutes = entityAssigner(
    instituteQueries.selectByIds,
    instituteQueries.selectByStructuresId,
    structuresInstituteQueries.unassignInstituteFromStructures,
    structuresInstituteQueries.assignInstituteToStructures
  );

  const updateSectionsCN = entityAssigner(
    sectionCNQueries.selectByIds,
    sectionCNQueries.selectByStructuresId,
    StructuresSectionCNQueries.unassignSectionCNFromStructures,
    StructuresSectionCNQueries.assignSectionCNToStructures
  );

  const insertOne = function* insertOne(structures) {
    try {
      yield client.begin();

      const insertedStructures = yield structuresClient.insertOne(structures);

      const communities = yield updateCommunities(
        structures.communities,
        insertedStructures.id
      );
      const institutes = yield updateInstitutes(
        structures.institutes,
        insertedStructures.id
      );
      const sectionsCN = yield updateSectionsCN(
        structures.sections_cn,
        insertedStructures.id
      );

      yield client.commit();

      return {
        ...insertedStructures,
        communities,
        institutes,
        sections_cn: sectionsCN
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const updateOne = function*(selector, structures) {
    try {
      yield client.begin();

      let updatedStructures;
      try {
        updatedStructures = yield structuresClient.updateOne(
          selector,
          structures
        );
      } catch (error) {
        if (error.message !== "no valid column to set") {
          throw error;
        }
        updatedStructures = yield structuresClient.selectOne({ id: selector });
      }

      const communities = yield updateCommunities(
        structures.communities,
        updatedStructures.id
      );
      const institutes = yield updateInstitutes(
        structures.institutes,
        updatedStructures.id
      );
      const sectionsCN = yield updateSectionsCN(
        structures.sections_cn,
        updatedStructures.id
      );

      yield client.commit();

      return {
        ...updatedStructures,
        communities,
        institutes,
        sections_cn: sectionsCN
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const selectByIds = function*(ids) {
    const structures = yield structuresClient.selectByIds(ids);
    checkEntityExists("Structuress", "id", ids, structures);

    return structures;
  };

  const selectByCodes = function*(codes, check = true) {
    const structures = yield structuresClient.selectBy(null, null, {
      code: codes
    });
    if (check) {
      checkEntityExists("Structuress", "id", codes, structures);
    }

    return structures;
  };

  const selectByJanusAccountId = function*(userId) {
    return yield structuresClient.selectByJanusAccountId(
      null,
      null,
      { janus_account_id: userId },
      "index",
      "ASC"
    );
  };

  const selectByInistAccountId = function*(inistAccountId) {
    return yield structuresClient.selectByInistAccountId(
      null,
      null,
      { inist_account_id: inistAccountId },
      "index",
      "ASC"
    );
  };

  return {
    ...structurestClient,
    updateCommunities,
    updateInstitutes,
    insertOne,
    updateOne,
    selectByIds,
    selectByCodes,
    selectByJanusAccountId,
    selectByInistAccountId
  };
}

Structures.queries = structuresQueries;

export default Structures;
