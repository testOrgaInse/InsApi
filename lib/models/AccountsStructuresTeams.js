import accountsStructuresTeamsQueries from "../queries/accountsStructuresTeamsQueries";

function AccountsStructuresTeams(client) {
  const accountsStructuresTeamsClient = client.link(
    AccountsStructuresTeams.queries
  );

  return {
    ...accountsStructuresTeamsClient
  };
}

AccountsStructuresTeams.queries = accountsStructuresTeamsQueries;

export default AccountsStructuresTeams;
