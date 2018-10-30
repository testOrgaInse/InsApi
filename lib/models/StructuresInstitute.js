import structuresInstituteQueries from "../queries/structuresInstituteQueries";

function StructuresInstitute(client) {
  const structuresInstituteClient = client.link(StructuresInstitute.queries);

  const assignInstituteToStructures = function*(instituteIds, structuresId) {
    return yield unitInstituteClient.batchUpsert(
      instituteIds.map((instituteId, index) => ({
        institute_id: instituteId,
        structures_id: structuresId,
        index
      }))
    );
  };

  const unassignInstituteFromStructures = function*(
    instituteIds,
    structuresId
  ) {
    return yield structuresInstituteClient.batchDelete(
      instituteIds.map((instituteId, index) => ({
        institute_id: instituteId,
        structures_id: structuresId,
        index
      }))
    );
  };

  return {
    ...structuresInstituteClient,
    assignInstituteToStructures,
    unassignInstituteFromStructures
  };
}

StructuresInstitute.queries = structuresInstituteQueries;

export default StructuresInstitute;
