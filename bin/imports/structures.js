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
  "structure_type", // StructureT
  "iunop_code", // iunop
  "code", // StructureT + StructureC
  "name", // Intitulé_structure
  "number_of_certified_team", // nb_eq_label
  "regional_delegation", // DR
  "site", // Localisation
  "street", // adresse1 + adresse2
  "address_supplement", // complementAdresse + complementEtranger
  "postal_code", // CP
  "city", // ville
  "country", // pays
  "director_lastname", // directeur_nom
  "director_firstname", // directeur_prénom
  "director_email", // directeur_email
  "email", // email_structure
  "dc_lastname", // Nom_CD
  "dc_firstname", // Prénom_CD
  "dc_phone", // Tel_CD
  "dc_email", // Courriel_CD
  "mixt_university", // Université de mixité
  "cnrs_mixity", // Mixité CNRS
  "other_mixity", // Mixité-autres_1 + Mixité-autres_2 + Mixité-autres_3
  "principal_it", // IT1
  // Manque IT2 en base // IT2 + IT3 + IT4 + IT5
  "specialized_commission", // CSS1 + CSS2
  "total_etp_effectiv" // etp_total
  // commentaire_unité
];

const csvFilePath = "./imports/structures.csv";

(async () => {
  try {
    let data = await csv({ delimiter: ["|"] }).fromFile(csvFilePath);
    data = changeCSV(data);
    await importData(data, 0);
  } catch (err) {
    console.log("Catch ERR");
    console.error(err);
  }
})();

async function importData(data, i) {
  if (i >= data.length) return;
  const result = await pool.query({
    sql: `INSERT INTO structure (structure_type, iunop_code, code, name, number_of_certified_team, regional_delegation, site, street, address_supplement,
       postal_code, city, country, director_lastname, director_firstname, director_email, email, dc_lastname, dc_firstname, dc_phone, dc_email,
        mixt_university, cnrs_mixity, other_mixity, principal_it, specialized_commission, total_etp_effectiv) VALUES ($structure_type, $iunop_code, $code, $name,
           $number_of_certified_team, $regional_delegation, $site, $street, $address_supplement, $postal_code, $city, $country, $director_lastname, $director_firstname,
            $director_email, $email, $dc_lastname, $dc_firstname, $dc_phone, $dc_email, $mixt_university, $cnrs_mixity, $other_mixity, $principal_it,
             $specialized_commission, $total_etp_effectiv)`,
    parameters: {
      structure_type: data[i].structure_type,
      iunop_code: data[i].iunop_code,
      code: data[i].code,
      name: data[i].name,
      number_of_certified_team: data[i].number_of_certified_team,
      regional_delegation: data[i].regional_delegation,
      site: data[i].site,
      street: data[i].street,
      address_supplement: data[i].address_supplement,
      postal_code: data[i].postal_code,
      city: data[i].city,
      country: data[i].country,
      director_lastname: data[i].director_lastnamen,
      director_firstname: data[i].director_firstname,
      director_email: data[i].director_email,
      email: data[i].email,
      dc_lastname: data[i].dc_lastname,
      dc_firstname: data[i].dc_firstname,
      dc_phone: data[i].dc_phone,
      dc_email: data[i].dc_email,
      mixt_university: data[i].mixt_university,
      cnrs_mixity: data[i].cnrs_mixity,
      other_mixity: data[i].other_mixity,
      principal_it: data[i].principal_it,
      specialized_commission: data[i].specialized_commission,
      total_etp_effectiv: data[i].total_etp_effectiv
    }
  });
  i++;
  importData(data, i);
}

function changeCSV(data) {
  data.forEach(element => {
    element.structure_type = element.StructureT;
    element.iunop_code = element.iunop;
    delete element.iunop;
    element.code = element.StructureT + element.StructureC;
    delete element.StructureT;
    delete element.StructureC;
    element.name = element.Intitulé_structure;
    delete element.Intitulé_structure;
    element.number_of_certified_team = element.nb_eq_label;
    delete element.nb_eq_label;
    element.regional_delegation = element.DR;
    delete element.DR;
    element.site = element.Localisation;
    delete element.Localisation;
    element.street = element.adresse1 + element.adresse2;
    delete element.adresse1;
    delete element.adresse2;
    element.address_supplement =
      element.complementAdresse + element.complementEtranger;
    delete element.complementAdresse;
    delete element.complementEtranger;
    element.postal_code = element.CP;
    delete element.CP;
    element.city = element.ville;
    delete element.ville;
    element.country = element.pays;
    delete element.pays;
    element.director_lastname = element.directeur_nom;
    delete element.directeur_nom;
    element.director_firstname = element.directeur_prénom;
    delete element.directeur_prénom;
    element.director_email = element.directeur_email;
    delete element.directeur_email;
    element.email = element.email_structure;
    delete element.email_structure;
    element.dc_lastname = element.Nom_CD;
    delete element.Nom_CD;
    element.dc_firstname = element.directeur_prénom;
    delete element.directeur_prénom;
    element.dc_phone = element.Tel_CD;
    delete element.Tel_CD;
    element.dc_email = element.Courriel_CD;
    delete element.Courriel_CD;
    element.mixt_university = element["Université de mixité"];
    delete element["Université de mixité"];
    element.cnrs_mixity = element["Mixité CNRS"];
    delete element["Mixité CNRS"];
    element.other_mixity =
      element["Mixité-autres_1"] +
      element.Mixité_autres_2 +
      element.Mixité_autres_3;
    delete element["Mixité-autres_1"];
    delete element.Mixité_autres_2;
    delete element.Mixité_autres_3;
    element.principal_it = element.IT1;
    delete element.IT1;
    element.specialized_commission = element.CSS1;
    delete element.CSS1;
    delete element.CSS2;
    if (element.etp_total != undefined)
      element.total_etp_effectiv = element.etp_total.replace(",", ".");
    delete element.etp_total;
    //add IT2
    delete element.IT2;
    delete element.IT3;
    delete element.IT4;
    delete element.IT5;
  });
  // changeCSV(data);
  return data;
}
