"use strict";
import config from "config";
import { PgPool } from "co-postgres-queries";

const pool = new PgPool({
  user: config.postgres.user,
  password: config.postgres.password,
  host: config.postgres.host,
  port: config.postgres.port,
  database: config.postgres.database
});

export const dropTables = async () => {
  console.log("TRUNCATE teams");
  await pool.query({
    sql: "TRUNCATE TABLE teams CASCADE;",
    parameters: {}
  });
  console.log("TRUNCATE structure_institute_add");
  await pool.query({
    sql: "TRUNCATE TABLE structure_institute_add CASCADE;",
    parameters: {}
  });
  console.log("TRUNCATE structure_community_add");
  await pool.query({
    sql: "TRUNCATE TABLE structure_community_add CASCADE;",
    parameters: {}
  });
  console.log("TRUNCATE structures CASCADE");
  await pool.query({
    sql: "TRUNCATE TABLE structures CASCADE;",
    parameters: {}
  });
  console.log("TRUNCATE section_cn");
  await pool.query({
    sql: "TRUNCATE TABLE section_cn CASCADE;",
    parameters: {}
  });
  console.log("TRUNCATE regionals_delegations");
  await pool.query({
    sql: "TRUNCATE TABLE regionals_delegations CASCADE;",
    parameters: {}
  });
  console.log("TRUNCATE institute");
  await pool.query({
    sql: "TRUNCATE TABLE institute CASCADE;",
    parameters: {}
  });
  console.log("TRUNCATE community");
  await pool.query({
    sql: "TRUNCATE TABLE community CASCADE;",
    parameters: {}
  });
  console.log("TRUNCATE migrat");
  await pool.query({
    sql: "TRUNCATE TABLE migrat CASCADE;",
    parameters: {}
  });
};
