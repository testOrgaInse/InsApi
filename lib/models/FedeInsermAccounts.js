import fedeInsermAccountsQueries from "../queries/fedeInsermAccountsQueries";

function FedeInsermAccounts(client) {
  const fedeInsermAccountsClient = client.link(FedeInsermAccounts.queries);

  const selectOne = function*(selector) {
    // structures-teams account
    const resultFedeInserm = yield fedeInsermAccountsClient.selectOne(selector);
    console.log(resultFedeInserm);
    // team
    const resultTeams = yield client.query({
      sql: `SELECT name FROM teams WHERE id = $id`,
      parameters: { id: resultFedeInserm.team_number }
    });

    return {
      ...resultFedeInserm,
      ...resultTeams[0]
    };
  };

  return {
    ...fedeInsermAccountsClient,
    selectOne
  };
}

FedeInsermAccounts.queries = fedeInsermAccountsQueries;

export default FedeInsermAccounts;
