import csv from "csvtojson";
import pool from "./connexion_database";

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
