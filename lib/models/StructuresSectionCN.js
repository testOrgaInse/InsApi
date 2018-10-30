import structuresSectionCNQueries from "../queries/structuresSectionCNQueries";

function StructuresSectionCN(client) {
  const structuresSectionCNClient = client.link(StructuresSectionCN.queries);

  const assignSectionCNToStructures = function*(sectionCNIds, structuresId) {
    return yield structuresSectionCNClient.batchUpsert(
      sectionCNIds.map(sectionCNId => ({
        structures_id: structuresId,
        section_cn_id: sectionCNId
      }))
    );
  };

  const unassignSectionCNFromStructures = function*(
    sectionCNIds,
    structuresId
  ) {
    return yield structuresSectionCNClient.batchDelete(
      sectionCNIds.map(sectionCNId => ({
        structures_id: structuresId,
        section_cn_id: sectionCNId
      }))
    );
  };

  return {
    ...structuresSectionCNClient,
    assignSectionCNToStructures,
    unassignSectionCNFromStructures
  };
}

StructuresSectionCN.queries = structuresSectionCNQueries;

export default StructuresSectionCN;
