import csv from "csvtojson";
import pool from "./connexion_database";

const csvFilePath = "./imports/regionals_delegations.csv";

export const importRegionalsDelegations = async () => {
  let data = await csv({ delimiter: [";"] }).fromFile(csvFilePath);
  return importData(data, 0);
};

async function importData(data, i) {
  if (i == data.length) {
    return Promise.resolve;
  }
  if (data[i]["Code"]) {
    await pool.query({
      sql: `INSERT INTO regionals_delegations 
      (name, code, address, phone, dr_mail, director_name, director_mail, rh_name, rh_mail, rri_name, rri_mail, website)
       VALUES ($name, $code, $address, $phone, $dr_mail, $director_name, $director_mail, $rh_name, $rh_mail, $rri_name, $rri_mail, $website)`,
      parameters: {
        name: data[i]["Nom"],
        code: data[i]["Code"],
        address: data[i]["Adresse"],
        phone: data[i]["Téléphone"],
        dr_mail: data[i]["Mail_DR"],
        director_name: data[i]["Directeur_nom"],
        director_mail: data[i]["Mail_directeur"],
        rh_name: data[i]["RH_nom"],
        rh_mail: data[i]["RH_mail"],
        rri_name: data[i]["RRI_nom"],
        rri_mail: data[i]["RRI_mail"],
        website: data[i]["Site_internet"]
      }
    });
  }
  i++;
  await importData(data, i);
}
