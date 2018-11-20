import csv from "csvtojson";
import pool from "./connexion_database";

const csvFilePath = "./imports/account_structures_teams.csv";

export const importAccountStructuresTeams = async () => {
  let data = await csv({ delimiter: [";"] }).fromFile(csvFilePath);
  data = await changeCSV(data);
  return importData(data, 0);
};

async function changeCSV(data) {
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
    element.structure_type = element["Type de structure"];
    delete element["Type de structure"];
    element.structure_code = listStructures.find(
      n => n.code === element["Code Structure"]
    ).id;
    delete element["Code Structure"];
    element.team_number = listTeams.find(
      n => n.team_number === element["Numéro d'Equipe"]
    ).id;
    delete element["Numéro d'Equipe"];
    element.register_date = element["Date d'inscription"];
    delete element["Date d'inscription"];
    element.expiration_date = element["Date d'expiration"];
    if (
      element["Date d'expiration"] == "" ||
      element["Date d'expiration"] == "0000-00-00"
    )
      element.expiration_date = null;
    delete element["Date d'expiration"];
    element.community = "INSERM";
  });
  return data;
}

async function importData(data, i) {
  if (i >= data.length) return;
  const teams = await pool.query({
    sql: `INSERT INTO account_structures_teams (login, password, type_of_code, structure_type, structure_code, team_number, register_date, community, expiration_date)
          VALUES ($login, $password, $type_of_code, $structure_type, $structure_code, $team_number, $register_date, $community, $expiration_date)`,
    parameters: {
      login: data[i].login,
      password: data[i].password,
      type_of_code: data[i].type_of_code,
      structure_type: data[i].structure_type,
      structure_code: data[i].structure_code,
      team_number: data[i].team_number,
      register_date: data[i].register_date,
      community: data[i].community,
      expiration_date: data[i].expiration_date
    }
  });
  i++;
  await importData(data, i);
}
