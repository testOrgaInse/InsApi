import csv from "csvtojson";
import pool from "./connexion_database";

const csvFilePath = "./imports/account_structures_teams.csv";

export const importAccountStructuresTeams = async () => {
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
  const listStructures = await pool.query({
    sql: `SELECT id, code FROM structures`,
    parameters: {}
  });
  data.forEach(element => {
    element.login = element.Identifiant;
    delete element.Identifiant;
    element.password = element["Mot de passe"];
    delete element["Mot de passe"];
    element.type_of_code = element["Type de code"];
    delete element["Type de code"];
    element.type_of_structure = element["Type de structure"];
    delete element["Type de structure"];
    element.structure_code = listStructures.find(
      n => n.code === element["Code Structure"]
    ).id;
    delete element["Code Structure"];
    element.team_number = listTeams.find(
      n => n.team_number === element["Numéro d'Equipe"]
    ).id;
    delete element["Numéro d'Equipe"];
    element.team_name = element["Intitulé d'Equipe"];
    delete element["Intitulé d'Equipe"];
    element.researcher_lastname = element["Nom du chercheur"];
    delete element["Nom du chercheur"];
    element.researcher_firstname = element["Prénom du chercheur"];
    delete element["Prénom du chercheur"];
    element.researcher_email = element["Courriel du chercheur"];
    delete element["Courriel du chercheur"];
    if (element.DR) {
      element.regional_delegation = listRegionalsDelegations.find(
        n => n.code === element.DR
      ).id;
    }
    delete element.DR;
    element.site = element.Site;
    delete element.Site;
    element.city = element.Ville;
    delete element.Ville;
    element.register_date = element["Date d'inscription"];
    delete element["Date d'inscription"];
    element.expiration_date = element["Date d'expiration"];
    if (element.expiration_date == "") element.expiration_date = null;
    delete element["Date d'expiration"];
    element.community = "INSERM";
    console.log(element);
  });
  return data;
}

async function importData(data, i) {
  if (i >= data.length) return;
  const teams = await pool.query({
    sql: `INSERT INTO account_structures_teams (login, password, type_of_code, type_of_structure, structure_code, team_number, register_date, community)
          VALUES ($login, $password, $type_of_code, $type_of_structure, $structure_code, $team_number, $register_date, $community)`,
    parameters: {
      login: data[i].login,
      password: data[i].password,
      type_of_code: data[i].type_of_code,
      type_of_structure: data[i].type_of_structure,
      structure_code: data[i].structure_code,
      team_number: data[i].team_number,
      register_date: data[i].register_date,
      community: data[i].community
      //   expiration_date: data[i].expiration_date
    }
  });
  i++;
  await importData(data, i);
}
