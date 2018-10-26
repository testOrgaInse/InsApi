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

const fields = ["name", "gate", "user_id", "profile", "password", "ebsco"];
const csvFilePath = "imports/community.csv";

(async () => {
  const data = await csv().fromFile(csvFilePath);
  const result = await pool.query({
    sql: `INSERT INTO fede_inserm (${fields})`,
    parameters: { name: "world" }
  });
})();
