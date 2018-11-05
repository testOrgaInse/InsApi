import teamsQueries from "../queries/teamsQueries";

function Teams(client) {
  const teamsClient = client.link(Teams.queries);

  return {
    ...teamsClient
  };
}

Teams.queries = teamsQueries;

export default Teams;
