import csv from "csvtojson";
import pool from "./connexion_database";

const csvFilePath = "./imports/teams.csv";
const csvFilePath2 = "./imports/teams2.csv";

export const importTeams = async () => {
  let data = await csv({ delimiter: ["|"] }).fromFile(csvFilePath);
  let data2 = await csv({ delimiter: ["|"] }).fromFile(csvFilePath2);
  data = await changeCSV(data, data2);
  return importData(data, 0);
};

async function changeCSV(data, data2) {
  data.forEach(element => {
    let cut = 0;
    while (element.StructureC[cut] == "0") cut++;
    element.structure_code = element.structureT + element.StructureC.slice(cut);
    delete element.StructureT;
    delete element.StructureC;
    cut = 0;
    while (element.N0_équipe[cut] == "0") cut++;
    element.team_number =
      element.structure_code + "-" + element.N0_équipe.slice(cut);
    delete element.N0_équipe;
    element.name = element["Intitulé équipe"];
    delete element["Intitulé équipe"];
    element.principal_lastname = element.Responsable_équipe_nom;
    delete element.Responsable_équipe_nom;
    element.principal_firstname = element.Responsable_équipe_prénom;
    delete element.Responsable_équipe_prénom;
    element.principal_email = element.Responsable_équipe_courriel;
    delete element.Responsable_équipe_courriel;
    element.principal_it = element["IT_principal équipe"];
    if (element.principal_it == "") element.principal_it = null;
    delete element["IT_principal équipe"];
    if (element["CSS_équipe 1"] != "")
      element.specialized_commission = element["CSS_équipe 1"];
    // element.specialized_commission =
    // element["CSS_équipe 1"] + "-" + element["CSS_équipe 2"];
    delete element["CSS_équipe 1"];
    delete element["CSS_équipe 2"];
  });
  data2.forEach(element => {
    element.team_number = element.field1;
    delete element.field1;
    if (element.etp_total) {
      element.total_etp_effectiv = element.etp_total.replace(",", ".");
    }
    delete element.etp_total;
    if (element["Chercheurs _Inserm_PP"]) {
      element.nb_researchers_inserm_pp = element[
        "Chercheurs _Inserm_PP"
      ].replace(",", ".");
    }
    delete element["Chercheurs _Inserm_PP"];
    if (element["Chercheurs _Inserm_ETP"]) {
      element.nb_researchers_inserm_etp = element[
        "Chercheurs _Inserm_ETP"
      ].replace(",", ".");
    }
    delete element["Chercheurs _Inserm_ETP"];
    if (element.Cherceurs_CNRS_PP) {
      //changer
      element.nb_researchers_crns_pp = element.Cherceurs_CNRS_PP.replace(
        ",",
        "."
      );
    }
    delete element.Cherceurs_CNRS_PP;
    if (element.Cherceurs_CNRS_ETP) {
      element.nb_researchers_crns_etp = element.Cherceurs_CNRS_ETP.replace(
        ",",
        "."
      );
    }
    delete element.Cherceurs_CNRS_ETP;
    if (element.Chercheurs_autres_PP) {
      element.nb_researchers_other_pp = element.Chercheurs_autres_PP.replace(
        ",",
        "."
      );
    }
    delete element.Chercheurs_autres_PP;
    if (element.Chercheurs_autres_ETP) {
      element.nb_researchers_other_etp = element.Chercheurs_autres_ETP.replace(
        ",",
        "."
      );
    }
    delete element.Chercheurs_autres_ETP;
    if (element["Post-Doctorants_PP"]) {
      element.nb_post_phd_student_pp = element["Post-Doctorants_PP"].replace(
        ",",
        "."
      );
    }
    delete element["Post-Doctorants_PP"];
    if (element["Post-Doctorants_ETP"]) {
      element.nb_post_phd_student_etp = element["Post-Doctorants_ETP"].replace(
        ",",
        "."
      );
    }
    delete element["Post-Doctorants_ETP"];
    if (element.Doctorants_PP) {
      element.nb_phd_student_pp = element.Doctorants_PP.replace(",", ".");
    }
    delete element.Doctorants_PP;
    if (element.Doctorants_ETP) {
      element.nb_phd_student_etp = element.Doctorants_ETP.replace(",", ".");
    }
    delete element.Doctorants_ETP;
    if (element.CDI_Chercheurs_PP) {
      element.nb_cdi_researchers_pp = element.CDI_Chercheurs_PP.replace(
        ",",
        "."
      );
    }
    delete element.CDI_Chercheurs_PP;
    if (element.CDI_Chercheurs_ETP) {
      element.nb_cdi_researchers_etp = element.CDI_Chercheurs_ETP.replace(
        ",",
        "."
      );
    }
    delete element.CDI_Chercheurs_ETP;
    if (element.CDD_Chercheurs_PP) {
      element.nb_cdd_researchers_pp = element.CDD_Chercheurs_PP.replace(
        ",",
        "."
      );
    }
    delete element.CDD_Chercheurs_PP;
    if (element.CDD_Chercheurs_ETP) {
      element.nb_cdd_researchers_etp = element.CDD_Chercheurs_ETP.replace(
        ",",
        "."
      );
    }
    delete element.CDD_Chercheurs_ETP;
    if (element["Ens-Chercheurs_PP"]) {
      element.nb_teacher_researchers_pp = element["Ens-Chercheurs_PP"].replace(
        ",",
        "."
      );
    }
    delete element["Ens-Chercheurs_PP"];
    if (element["Ens-Chercheurs_ETP"]) {
      element.nb_teacher_researchers_etp = element[
        "Ens-Chercheurs_ETP"
      ].replace(",", ".");
    }
    delete element["Ens-Chercheurs_ETP"];
    if (element["PU-PH_PP"]) {
      element.nb_pu_ph_pp = element["PU-PH_PP"].replace(",", ".");
    }
    delete element["PU-PH_PP"];
    if (element["PU-PH_ETP"]) {
      element.nb_pu_ph_etp = element["PU-PH_ETP"].replace(",", ".");
    }
    delete element["PU-PH_ETP"];
    if (element["Hosp-Autres_PP"]) {
      element.nb_hosp_others_pp = element["Hosp-Autres_PP"].replace(",", ".");
    }
    delete element["Hosp-Autres_PP"];
    if (element["Hosp-Autres_ETP"]) {
      element.nb_hosp_others_etp = element["Hosp-Autres_ETP"].replace(",", ".");
    }
    delete element["Hosp-Autres_ETP"];
    if (element.IR_Inserm_PP) {
      element.nb_ir_inserm_pp = element.IR_Inserm_PP.replace(",", ".");
    }
    delete element.IR_Inserm_PP;
    if (element.IR_Inserm_ETP) {
      element.nb_ir_inserm_etp = element.IR_Inserm_ETP.replace(",", ".");
    }
    delete element.IR_Inserm_ETP;
    if (element.IR_non_Inserm_PP) {
      element.nb_ir_non_inserm_pp = element.IR_non_Inserm_PP.replace(",", ".");
    }
    delete element.IR_non_Inserm_PP;
    if (element.IR_non_Inserm_ETP) {
      element.nb_ir_non_inserm_etp = element.IR_non_Inserm_ETP.replace(
        ",",
        "."
      );
    }
    delete element.IR_non_Inserm_ETP;
    if (element["IngT _PP"]) {
      element.nb_ita_others_pp = element["IngT _PP"].replace(",", ".");
    }
    delete element["IngT _PP"];
    if (element["IngT _ETP"]) {
      element.nb_ita_others_etp = element["IngT _ETP"].replace(",", ".");
    }
    delete element["IngT _ETP"];
    if (element.CDD_IR_PP) {
      element.nb_cdd_ir_pp = element.CDD_IR_PP.replace(",", ".");
    }
    delete element.CDD_IR_PP;
    if (element.CDD_IR_ETP) {
      element.nb_cdd_ir_etp = element.CDD_IR_ETP.replace(",", ".");
    }
    delete element.CDD_IR_ETP;
    if (element.CDD_Autres_PP) {
      element.nb_cdd_others_pp = element.CDD_Autres_PP.replace(",", ".");
    }
    delete element.CDD_Autres_PP;
    if (element.CDD_Autres_ETP) {
      element.nb_cdd_others_etp = element.CDD_Autres_ETP.replace(",", ".");
    }
    delete element.CDD_Autres_ETP;
    if (element.Admin_PP) {
      element.nb_admin_pp = element.Admin_PP.replace(",", ".");
    }
    delete element.Admin_PP;
    if (element.Admin_ETP) {
      element.nb_admin_etp = element.Admin_ETP.replace(",", ".");
    }
    delete element.Admin_ETP;
  });
  data = await fusionByCode(data, data2);
  return data;
}

async function importData(data, i) {
  if (i >= data.length) return;
  const teams = await pool.query({
    sql: `INSERT INTO teams (structure_code, team_number, name, principal_lastname,
          principal_firstname, principal_email, principal_it, specialized_commission, total_etp_effectiv,
          nb_researchers_inserm_pp, nb_researchers_inserm_etp, nb_researchers_crns_pp, nb_researchers_crns_etp,
          nb_researchers_other_pp, nb_researchers_other_etp, nb_post_phd_student_pp, nb_post_phd_student_etp, nb_phd_student_pp, nb_phd_student_etp, nb_cdi_researchers_pp,
          nb_cdi_researchers_etp, nb_cdd_researchers_pp, nb_cdd_researchers_etp, nb_teacher_researchers_pp, nb_teacher_researchers_etp, nb_pu_ph_pp, nb_pu_ph_etp, nb_hosp_others_pp,
          nb_hosp_others_etp, nb_ir_inserm_pp, nb_ir_inserm_etp, nb_ir_non_inserm_pp, nb_ir_non_inserm_etp, nb_ita_others_pp, nb_ita_others_etp, nb_cdd_ir_pp,
          nb_cdd_ir_etp, nb_cdd_others_pp, nb_cdd_others_etp, nb_admin_pp, nb_admin_etp)
          VALUES ($structure_code, $team_number, $name, $principal_lastname,
            $principal_firstname, $principal_email, $principal_it, $specialized_commission, $total_etp_effectiv,
            $nb_researchers_inserm_pp, $nb_researchers_inserm_etp, $nb_researchers_crns_pp, $nb_researchers_crns_etp,
            $nb_researchers_other_pp, $nb_researchers_other_etp, $nb_post_phd_student_pp, $nb_post_phd_student_etp, $nb_phd_student_pp, $nb_phd_student_etp, $nb_cdi_researchers_pp,
            $nb_cdi_researchers_etp, $nb_cdd_researchers_pp, $nb_cdd_researchers_etp, $nb_teacher_researchers_pp, $nb_teacher_researchers_etp, $nb_pu_ph_pp, $nb_pu_ph_etp, $nb_hosp_others_pp,
            $nb_hosp_others_etp, $nb_ir_inserm_pp, $nb_ir_inserm_etp, $nb_ir_non_inserm_pp, $nb_ir_non_inserm_etp, $nb_ita_others_pp, $nb_ita_others_etp, $nb_cdd_ir_pp,
            $nb_cdd_ir_etp, $nb_cdd_others_pp, $nb_cdd_others_etp, $nb_admin_pp, $nb_admin_etp)`,
    parameters: {
      structure_code: data[i].structure_code,
      team_number: data[i].team_number,
      name: data[i].name,
      principal_lastname: data[i].principal_lastname,
      principal_firstname: data[i].principal_firstname,
      principal_email: data[i].principal_email,
      principal_it: data[i].principal_it,
      specialized_commission: data[i].specialized_commission,
      total_etp_effectiv: data[i].total_etp_effectiv,
      nb_researchers_inserm_pp: data[i].nb_researchers_inserm_pp,
      nb_researchers_inserm_etp: data[i].nb_researchers_inserm_etp,
      nb_researchers_crns_pp: data[i].nb_researchers_crns_pp,
      nb_researchers_crns_etp: data[i].nb_researchers_crns_etp,
      nb_researchers_other_pp: data[i].nb_researchers_other_pp,
      nb_researchers_other_etp: data[i].nb_researchers_other_etp,
      nb_post_phd_student_pp: data[i].nb_post_phd_student_pp,
      nb_post_phd_student_etp: data[i].nb_post_phd_student_etp,
      nb_phd_student_pp: data[i].nb_phd_student_pp,
      nb_phd_student_etp: data[i].nb_phd_student_etp,
      nb_cdi_researchers_pp: data[i].nb_cdi_researchers_pp,
      nb_cdi_researchers_etp: data[i].nb_cdi_researchers_etp,
      nb_cdd_researchers_pp: data[i].nb_cdd_researchers_pp,
      nb_cdd_researchers_etp: data[i].nb_cdd_researchers_etp,
      nb_teacher_researchers_pp: data[i].nb_teacher_researchers_pp,
      nb_teacher_researchers_etp: data[i].nb_teacher_researchers_etp,
      nb_pu_ph_pp: data[i].nb_pu_ph_pp,
      nb_pu_ph_etp: data[i].nb_pu_ph_etp,
      nb_hosp_others_pp: data[i].nb_hosp_others_pp,
      nb_hosp_others_etp: data[i].nb_hosp_others_etp,
      nb_ir_inserm_pp: data[i].nb_ir_inserm_pp,
      nb_ir_inserm_etp: data[i].nb_ir_inserm_etp,
      nb_ir_non_inserm_pp: data[i].nb_ir_non_inserm_pp,
      nb_ir_non_inserm_etp: data[i].nb_ir_non_inserm_etp,
      nb_ita_others_pp: data[i].nb_ita_others_pp,
      nb_ita_others_etp: data[i].nb_ita_others_etp,
      nb_cdd_ir_pp: data[i].nb_cdd_ir_pp,
      nb_cdd_ir_etp: data[i].nb_cdd_ir_etp,
      nb_cdd_others_pp: data[i].nb_cdd_others_pp,
      nb_cdd_others_etp: data[i].nb_cdd_others_etp,
      nb_admin_pp: data[i].nb_admin_pp,
      nb_admin_etp: data[i].nb_admin_etp
    }
  });
  i++;
  await importData(data, i);
}

async function fusionByCode(data, data2) {
  data2.forEach(element => {
    for (let i = 0; i < data.length; i++) {
      if (element.team_number == data[i].team_number) {
        data[i] = Object.assign({}, data[i], element);
      }
    }
  });
  return data;
}
