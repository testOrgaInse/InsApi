import csv from "csvtojson";
import pool from "./connexion_database";

const csvFilePath = "./imports/individual_account_fede.csv";

export const importIndividualAccountFede = async () => {
  let data = await csv({ delimiter: [";"] }).fromFile(csvFilePath);
  data = await changeCSV(data);
  return importData(data, 0);
};

async function changeCSV(data) {
  const listRegionalsDelegations = await pool.query({
    sql: `SELECT id, code FROM regionals_delegations`,
    parameters: {}
  });
  const listTeams = await pool.query({
    sql: `SELECT id, team_number FROM teams`,
    parameters: {}
  });
  const listSpecializedCommission = await pool.query({
    sql: `SELECT id, code FROM section_cn`,
    parameters: {}
  });
  const listStructures = await pool.query({
    sql: `SELECT id, code FROM structures`,
    parameters: {}
  });
  const listInstitutes = await pool.query({
    sql: `SELECT id, code FROM institute`,
    parameters: {}
  });
  data.forEach(element => {
    const regional_delegation = listRegionalsDelegations.find(
      n => n.code === element.DR
    );
    element.regional_delegation = regional_delegation
      ? regional_delegation.id
      : null;
    delete element.DR;
    element.structure_type = element["Type_de_structure"];
    delete element["Type_de_structure"];
    const structure_code = listStructures.find(
      n => n.code === element["Code_de_structure"]
    );
    element.structure_code = structure_code ? structure_code.id : null;
    delete element["Code_de_structure"];
    element.uinop_code = element["Code_uinop"];
    delete element["Code_uinop"];
    delete element["Intitule_structure"];
    element.site = element.Site;
    delete element.Site;
    element.city = element.Ville;
    delete element.Ville;
    const teams = listTeams.find(
      n => n.team_number === element["Numero_equipe"]
    );
    element.team_number = teams ? teams.id : null;
    delete element["Numero_equipe"];
    delete element["Code_equipe_secondaire"];
    const secondary_team_code = listStructures.find(
      n => n.code === element["Code_equipe_secondaire"]
    );
    element.secondary_team_code = secondary_team_code
      ? secondary_team_code.id
      : null;
    const institute = listInstitutes.find(
      n => n.code === element["ITMO_principal"]
    );
    element.itmo_principal = institute ? institute.id : null;
    delete element["ITMO_principal"];
    element.agent_function = element["Fonction_agent"];
    delete element["Fonction_agent"];
    element.uid = element.UID;
    delete element.UID;
    element.lastname = element.Nom;
    delete element.Nom;
    element.firstname = element.Prénom;
    delete element.Prénom;
    element.inserm_email = element["Courriel_INSERM"];
    delete element["Courriel_INSERM"];
    element.email = element["Courriel_usuel"];
    delete element["Courriel_usuel"];
    element.orcid_number = element["Numero_ORCID"];
    delete element["Numero_ORCID"];
    element.researcher_id = element["Numero_ID_researcher"];
    delete element["Numero_ID_researcher"];
    element.membership = element.Appartenance;
    delete element.Appartenance;
    element.type_of_assigned_structure = element["Affectation"];
    delete element["Affectation"];
    element.agent_status = element["Statut_agent"];
    delete element["Statut_agent"];
    if (element.CSS1.length > 0) {
      const specialized_commission = listSpecializedCommission.find(
        n => n.code === element.CSS1
      );
      element.specialized_commission = specialized_commission
        ? specialized_commission.id
        : null;
      delete element.CSS1;
    }

    element.register_date = element["Premiere_connexion"];
    delete element["Premiere_connexion"];
    element.last_connection = element["Derniere_connexion"];
    if (
      element["Derniere_connexion"] == "" ||
      element["Derniere_connexion"] == "0000-00-00"
    )
      element.last_connection = null;
    delete element["Derniere_connexion"];
    element.community = "proxy";
  });
  return data;
}

async function importData(data, i) {
  if (i >= data.length) return;
  const teams = await pool.query({
    sql: `INSERT INTO individual_account_fede (regional_delegation, structure_type, structure_code, uinop_code, site, city,
        team_number, secondary_team_code, itmo_principal, agent_function, uid, lastname, firstname, inserm_email, email, orcid_number, researcher_id, membership,
        type_of_assigned_structure, agent_status, specialized_commission, register_date, last_connection, community)
          VALUES ($regional_delegation, $structure_type, $structure_code, $uinop_code, $site, $city,
            $team_number, $secondary_team_code, $itmo_principal, $agent_function, $uid, $lastname, $firstname, $inserm_email, $email, $orcid_number, $researcher_id, $membership,
            $type_of_assigned_structure, $agent_status, $specialized_commission, $register_date, $last_connection, $community)`,
    parameters: {
      regional_delegation: data[i].regional_delegation,
      structure_code: data[i].structure_code,
      structure_type: data[i].structure_type,
      uinop_code: data[i].uinop_code,
      site: data[i].site,
      city: data[i].city,
      team_number: data[i].team_number,
      secondary_team_code: data[i].secondary_team_code,
      itmo_principal: data[i].itmo_principal,
      agent_function: data[i].agent_function,
      uid: data[i].uid,
      lastname: data[i].lastname,
      firstname: data[i].firstname,
      inserm_email: data[i].inserm_email,
      email: data[i].email,
      orcid_number: data[i].orcid_number,
      researcher_id: data[i].researcher_id,
      membership: data[i].membership,
      type_of_assigned_structure: data[i].type_of_assigned_structure,
      agent_status: data[i].agent_status,
      specialized_commission: data[i].specialized_commission,
      register_date: data[i].register_date,
      last_connection: data[i].last_connection,
      community: data[i].community
    }
  });
  i++;
  await importData(data, i);
}
