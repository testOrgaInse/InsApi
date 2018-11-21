import regionalsDelegationsQueries from "../queries/regionalsDelegationsQueries";

function RegionalsDelegations(client) {
  const regionalsDelegationsClient = client.link(RegionalsDelegations.queries);

  return {
    ...regionalsDelegationsClient
  };
}

RegionalsDelegations.queries = regionalsDelegationsQueries;

export default RegionalsDelegations;
