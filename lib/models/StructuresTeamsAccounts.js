import structuresTeamsAccountsQueries from "../queries/structuresTeamsAccountsQueries";

function StructuresTeamsAccounts(client) {
  const structuresTeamsAccountsClient = client.link(
    StructuresTeamsAccounts.queries
  );

  const selectOne = function*(selector) {
    // structures-teams account
    const resultStructuresTeams = yield structuresTeamsAccountsClient.selectOne(
      selector
    );
    // structure
    const resultStructures = yield client.query({
      sql: `SELECT regional_delegation, site, city, 
      mixt_university, cnrs_mixity, other_mixity 
      FROM structures
      WHERE id = $id`,
      parameters: { id: resultStructuresTeams.structure_code }
    });
    // team
    const resultTeams = yield client.query({
      sql: `SELECT name, principal_lastname, principal_firstname,
      principal_email, principal_it, specialized_commission 
      FROM teams
      WHERE id = $id`,
      parameters: { id: resultStructuresTeams.team_number }
    });
    return {
      ...resultStructuresTeams,
      ...resultTeams[0],
      ...resultStructures[0]
    };
  };

  const selectEzTicketInfoForId = function* selectEzTicketInfoForId(...args) {
    const user = yield structuresTeamsAccountsClient.selectEzTicketInfoForId(
      ...args
    );

    return {
      username: user[0].login,
      domains: user[0].community,
      groups: [user[0].community]
    };
  };

  const authenticate = function*(username, password) {
    const user = yield client.query({
      sql: `SELECT id, login, password, community
      FROM account_structures_teams
      WHERE login = $login AND password = $password`,
      parameters: { login: username, password }
    });
    if (user.length > 0) {
      return {
        id: user[0].id,
        username,
        domains: user[0].community,
        groups: [user[0].community]
      };
    }
    return null;
  };

  return {
    ...structuresTeamsAccountsClient,
    selectOne,
    selectEzTicketInfoForId,
    authenticate
  };
}

StructuresTeamsAccounts.queries = structuresTeamsAccountsQueries;

export default StructuresTeamsAccounts;
