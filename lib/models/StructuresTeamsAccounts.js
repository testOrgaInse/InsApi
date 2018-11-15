import structuresTeamsAccountsQueries from "../queries/structuresTeamsAccountsQueries";

function StructuresTeamsAccounts(client) {
  const structuresTeamsAccountsClient = client.link(
    StructuresTeamsAccounts.queries
  );

  return {
    ...structuresTeamsAccountsClient
  };
}

StructuresTeamsAccounts.queries = structuresTeamsAccountsQueries;

export default StructuresTeamsAccounts;
