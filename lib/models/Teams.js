import teamsQueries from "../queries/teamsQueries";
import {
  selectNbAccountStructures,
  selectNbAccountTeams,
  selectNbAccountIndividual
} from "../queries/countNumberAccounts";

function Teams(client) {
  const teamsClient = client.link(Teams.queries);

  const selectOne = function*(selector) {
    // team
    const resultTeams = yield teamsClient.selectOne(selector);
    // structure
    const resultStructures = yield client.query({
      sql: `SELECT structure_type, code, iunop_code,
      regional_delegation, site, city, mixt_university,
      cnrs_mixity, other_mixity, dc_lastname,
      dc_firstname, dc_phone, dc_email 
      FROM structures
      WHERE id = $id`,
      parameters: { id: resultTeams.structure_code }
    });
    // compteur
    const countStructureAccount = yield client.query({
      sql: selectNbAccountStructures.replace("structures.id", "$id"),
      parameters: { id: resultTeams.structure_code }
    });
    const countTeamAccount = yield client.query({
      sql: selectNbAccountTeams.replace("structures.id", "$id"),
      parameters: { id: resultTeams.structure_code }
    });
    const individualAccount = yield client.query({
      sql: selectNbAccountIndividual.replace("structures.id", "$id"),
      parameters: { id: resultTeams.structure_code }
    });
    resultTeams.nb_structure_account = countStructureAccount[0].count;
    resultTeams.nb_team_account = countTeamAccount[0].count;
    resultTeams.nb_individual_account = individualAccount[0].count;
    return {
      ...resultTeams,
      ...resultStructures[0]
    };
  };

  return {
    ...teamsClient,
    selectOne
  };
}

Teams.queries = teamsQueries;

export default Teams;
