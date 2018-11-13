import pool from "./connexion_database";

export const importCommunity = async () => {
  const result = await pool.query({
    sql: "INSERT INTO community (name, gate) VALUES ($name, $gate)",
    parameters: { name: "INSERM", gate: "INSERM" }
  });
};
