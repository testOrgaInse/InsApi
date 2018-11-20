import csv from "csvtojson";
import pool from "./connexion_database";

const csvFilePath = "./imports/individual_account_fede.csv";

export const importIndividualAccountFede = async () => {
  let data = await csv({ delimiter: ["|"] }).fromFile(csvFilePath);
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
    element.regional_delegation = listRegionalsDelegations.find(
      n => n.code === element.DR
    ).id;
    delete element.DR;
    element.structure_type = element["Type de structure"];
    delete element["Type de structure"];
    element.structure_code = listStructures.find(
      n => n.code === element["Code de la structure"]
    ).id;
    delete element["Code de la structure"];
    element.uinop_code = element["Code uinop"];
    delete element["Code uinop"];
    element.structure_name = element["Intitulé de la structure"];
    delete element["Intitulé de la structure"];
    element.site = element.Site;
    delete element.Site;
    element.city = element.Ville;
    delete element.Ville;
    const teams = listTeams.find(
      n => n.team_number === element["Numéro d'équipe"]
    );
    element.team_number = teams ? teams.id : null;
    delete element["Numéro d'équipe"];
    element.second_team_code = element["Code équipe secondaire"];
    delete element["Code équipe secondaire"];
    const institute = listInstitutes.find(
      n => n.code === element["ITMO principal"]
    );
    element.itmo_principal = institute ? institute.id : null;
    delete element["ITMO principal"];
    element.agent_function = element["Fonction de l'agent"];
    delete element["Fonction de l'agent"];
    element.uid = element.UID;
    delete element.UID;
    element.lastname = element.Nom;
    delete element.Nom;
    element.firstname = element.Prénom;
    delete element.Prénom;
    element.inserm_email = element["Courriel Inserm"];
    delete element["Courriel Inserm"];
    element.email = element["Courriel usuel"];
    delete element["Courriel usuel"];
    element.orcid_number = element["Numéro ORCID"];
    delete element["Numéro ORCID"];
    element.researcher_id = element["Numéro ID researcher"];
    delete element["Numéro ID researcher"];
    element.membership = element.Appartenance;
    delete element.Appartenance;
    element.type_of_assigned_structure =
      element["Type structure d'affectation"];
    delete element["Type structure d'affectation"];
    element.agent_status = element["Statut de l'agent"];
    delete element["Statut de l'agent"];
    if (element["CSS1"] != "")
      element.specialized_commission = listSpecializedCommission.find(
        n => n.code === element.CSS1
      ).id;
    delete element.CSS1; //CSS2
    element.register_date = element["Première connexion"];
    delete element["Première connexion"];
    element.last_connection = element["Dernière connexion"];
    if (
      element["Dernière connexion"] == "" ||
      element["Dernière connexion"] == "0000-00-00"
    )
      element.last_connection = null;
    delete element["Dernière connexion"];
    element.community = "INSERM";
  });
  return data;
}

async function importData(data, i) {
  if (i >= data.length) return;
  const teams = await pool.query({
    sql: `INSERT INTO individual_account_fede (regional_delegation, structure_type, structure_code, uinop_code, structure_name, site, city,
        team_number, itmo_principal, agent_function, uid, lastname, firstname, inserm_email, email, orcid_number, researcher_id, membership,
        type_of_assigned_structure, agent_status, specialized_commission, register_date, last_connection, community)
          VALUES ($regional_delegation, $structure_type, $structure_code, $uinop_code, $structure_name, $site, $city,
            $team_number, $itmo_principal, $agent_function, $uid, $lastname, $firstname, $inserm_email, $email, $orcid_number, $researcher_id, $membership,
            $type_of_assigned_structure, $agent_status, $specialized_commission, $register_date, $last_connection, $community)`,
    parameters: {
      regional_delegation: data[i].regional_delegation,
      structure_code: data[i].structure_code,
      structure_type: data[i].structure_type,
      uinop_code: data[i].uinop_code,
      structure_name: data[i].structure_name,
      site: data[i].site,
      city: data[i].city,
      team_number: data[i].team_number,
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
