import structuresCommunityQueries from "../queries/structuresCommunityQueries";

function StructuresCommunity(client) {
  const structuresCommunityClient = client.link(StructuresCommunity.queries);

  const assignCommunityToStructures = function*(communityIds, structuresId) {
    return yield unitCommunityClient.batchUpsert(
      communityIds.map((communityId, index) => ({
        community_id: communityId,
        structurest_id: structuresId,
        index
      }))
    );
  };

  const unassignCommunityToStructures = function*(communityIds, unitId) {
    return yield unitCommunityClient.batchDelete(
      communityIds.map(communityId => ({
        community_id: communityId,
        structures_id: structuresId
      }))
    );
  };

  return {
    ...structuresCommunityClient,
    assignCommunityToStructures,
    unassignCommunityToStructures
  };
}

StructuresCommunity.queries = structuresCommunityQueries;

export default StructuresCommunity;
