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
  "comment"
];

const csvFilePath = "./imports/section_cn.csv";

export const importSectionCn = async () => {
  let data = await csv({ delimiter: [","] }).fromFile(csvFilePath);
  return importData(data, 0);
};

async function importData(data, i) {
  if (i == data.length) return Promise.resolve;
  const result = await pool.query({
    sql: `INSERT INTO section_cn (code, name, comment)
     VALUES ($code, $name, $comment)`,
    parameters: {
      code: data[i].code,
      name: data[i].name,
      comment: data[i].comment
    }
  });
  i++;
  await importData(data, i);
}
