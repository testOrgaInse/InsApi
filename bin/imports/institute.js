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
  "code", // StructureT
  "name", // iunop
  "address",
  "phone",
  "mail",
  "director",
  "mail_director"
];

const csvFilePath = "./imports/institute.csv";

export const importInstitute = async () => {
  let data = await csv({ delimiter: ["|"] }).fromFile(csvFilePath);
  return importData(data, 0);
};

async function importData(data, i) {
  if (i == data.length) return Promise.resolve;
  const result = await pool.query({
    sql: `INSERT INTO institute (code, name, address, phone, mail, director, mail_director)
     VALUES ($code, $name, $address, $phone, $mail, $director, $mail_director)`,
    parameters: {
      code: data[i].code,
      name: data[i].name,
      address: data[i].address,
      phone: data[i].phone,
      mail: data[i].mail,
      director: data[i].director,
      mail_director: data[i].mail_director
    }
  });
  i++;
  await importData(data, i);
}
