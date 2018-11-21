import pool from "./connexion_database";

export const dropTables = async () => {
  await pool.query({
    sql: "TRUNCATE TABLE teams CASCADE;",
    parameters: {}
  });
  await pool.query({
    sql: "TRUNCATE TABLE structures CASCADE;",
    parameters: {}
  });
  await pool.query({
    sql: "TRUNCATE TABLE section_cn CASCADE;",
    parameters: {}
  });
  await pool.query({
    sql: "TRUNCATE TABLE regionals_delegations CASCADE;",
    parameters: {}
  });
  await pool.query({
    sql: "TRUNCATE TABLE institute CASCADE;",
    parameters: {}
  });
  await pool.query({
    sql: "TRUNCATE TABLE community CASCADE;",
    parameters: {}
  });
  await pool.query({
    sql: "TRUNCATE TABLE migrat CASCADE;",
    parameters: {}
  });
};
