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
    const [user] = yield structuresTeamsAccountsClient.selectEzTicketInfoForId(
      ...args
    );

    console.log(`${user.login}_O_UNKNOWN_I_${user.structure_type}_OU_UNKNOWN`);

    return {
      username: `${user.login}_O_UNKNOWN_I_${user.structure_type}_OU_UNKNOWN`,
      domains: user.community,
      groups: [user.community]
    };
  };

  const authenticate = function*(username, password) {
    const [user] = yield client.query({
      sql: `SELECT id, login, password, community, expiration_date
      FROM account_structures_teams
      WHERE login = $login AND password = $password`,
      parameters: { login: username, password }
    });

    if (user) {
      if (
        user.expiration_date &&
        user.expiration_date.getTime() <= Date.now()
      ) {
        return null;
      }
      return {
        id: user.id,
        username,
        domains: user.community,
        groups: [user.community]
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
