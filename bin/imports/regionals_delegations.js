"use strict";
import csv from "csvtojson";
import config from "config";
import { PgPool } from "co-postgres-queries";

const pool = new PgPool({
  user: config.postgres.user,
  password: config.postgres.password,
  host: config.postgres.host,
  port: config.postgres.port,
  database: config.postgres.database
});

const fields = [
  "name", // StructureT
  "address", // iunop
  "phone", // StructureT + StructureC
  "mail", // Intitulé_structure
  "director", // nb_eq_label
  "director_mail", // DR
  "rh", // Localisation
  "rh_mail", // adresse1 + adresse2
  "rri", // complementAdresse + complementEtranger
  "rri_mail", // CP
  "website", // ville
  "code"
];

const csvFilePath = "./imports/regionals_delegations.csv";

export const importRegionalsDelegations = async () => {
  let data = await csv({ delimiter: [","] }).fromFile(csvFilePath);
  return importData(data, 0);
};

async function importData(data, i) {
  if (i == data.length) return Promise.resolve;
  const result = await pool.query({
    sql: `INSERT INTO regionals_delegations (name, address, phone, mail, director, director_mail, rh, rri, rh_mail, website, code)
     VALUES ($name, $address, $phone, $mail, $director, $director_mail, $rh, $rri, $rh_mail, $website, $code)`,
    parameters: {
      name: data[i].name,
      address: data[i].address,
      phone: data[i].phone,
      mail: data[i].mail,
      director: data[i].director,
      director_mail: data[i].director_mail,
      rh: data[i].mail,
      rri: data[i].rri,
      rh_mail: data[i].rh_mail,
      website: data[i].website,
      code: data[i].code
    }
  });
  i++;
  await importData(data, i);
}
