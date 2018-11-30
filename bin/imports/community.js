import pool from "./connexion_database";

export const importCommunity = async () => {
  await pool.query({
    sql: "INSERT INTO community (name, gate) VALUES ($name, $gate)",
    parameters: { name: "proxy", gate: "proxy" }
  });
};
