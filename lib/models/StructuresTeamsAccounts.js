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

    // additional information
    const [query] = yield client.query({
      sql: `SELECT account_structures_teams.login, structures.code AS structure_code, teams.team_number, institute.name AS it_principal, regionals_delegations.code AS dr_code, section_cn.code AS section_cn_code
      FROM account_structures_teams 
      LEFT JOIN structures ON account_structures_teams.structure_code = structures.id 
      LEFT JOIN teams ON account_structures_teams.team_number = teams.id
      LEFT JOIN institute ON structures.principal_it = institute.id
      LEFT JOIN regionals_delegations ON structures.regional_delegation = regionals_delegations.id
      LEFT JOIN section_cn ON structures.specialized_commission = section_cn.id
      WHERE account_structures_teams.id = $id`,
      parameters: { id: user.id }
    });

    return {
      username: `${user.login}_O_UNKNOWN_OU_${query.structure_code ||
        "UNKNOWN"}_OE_${query.team_number ||
        "UNKNOWN"}_I_${query.it_principal || "UNKNOWN"}_DR_${query.dr_code ||
        "UNKNOWN"}_CS_${query.section_cn_code || "UNKNOWN"}`,
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
