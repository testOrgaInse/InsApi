import { crudQueries } from "co-postgres-queries";
import {
  selectNbAccountStructures,
  selectNbAccountTeams,
  selectNbAccountIndividual
} from "./countNumberAccounts";

const fields = [
  "teams.id",
  "teams.structure_code",
  "teams.team_number",
  "teams.name",
  "teams.principal_lastname",
  "teams.principal_firstname",
  "teams.principal_email",
  "teams.specialized_commission",
  "teams.principal_it",
  "teams.total_etp_effectiv",
  "teams.nb_researchers_inserm_pp",
  "teams.nb_researchers_inserm_etp",
  "teams.nb_researchers_crns_pp",
  "teams.nb_researchers_crns_etp",
  "teams.nb_researchers_other_pp",
  "teams.nb_researchers_other_etp",
  "teams.nb_post_phd_student_pp",
  "teams.nb_post_phd_student_etp",
  "teams.nb_phd_student_pp",
  "teams.nb_phd_student_etp",
  "teams.nb_cdi_researchers_pp",
  "teams.nb_cdi_researchers_etp",
  "teams.nb_cdd_researchers_pp",
  "teams.nb_cdd_researchers_etp",
  "teams.nb_teacher_researchers_pp",
  "teams.nb_teacher_researchers_etp",
  "teams.nb_pu_ph_pp",
  "teams.nb_pu_ph_etp",
  "teams.nb_hosp_others_pp",
  "teams.nb_hosp_others_etp",
  "teams.nb_ir_inserm_pp",
  "teams.nb_ir_inserm_etp",
  "teams.nb_ir_non_inserm_pp",
  "teams.nb_ir_non_inserm_etp",
  "teams.nb_ita_others_pp",
  "teams.nb_ita_others_etp",
  "teams.nb_cdd_ir_pp",
  "teams.nb_cdd_ir_etp",
  "teams.nb_cdd_others_pp",
  "teams.nb_cdd_others_etp",
  "teams.nb_admin_pp",
  "teams.nb_admin_etp",
  "teams.active",
  "teams.comment",
  "structures.structure_type",
  "structures.code",
  "structures.iunop_code",
  "structures.regional_delegation",
  "structures.site",
  "structures.city",
  "structures.mixt_university",
  "structures.cnrs_mixity",
  "structures.other_mixity",
  "structures.dc_lastname",
  "structures.dc_firstname",
  "structures.dc_phone",
  "structures.dc_email"
];

const fieldsForInsertAndUpdate = [
  "id",
  "structure_code",
  "team_number",
  "name",
  "principal_lastname",
  "principal_firstname",
  "principal_email",
  "specialized_commission",
  "principal_it",
  "total_etp_effectiv",
  "nb_researchers_inserm_pp",
  "nb_researchers_inserm_etp",
  "nb_researchers_crns_pp",
  "nb_researchers_crns_etp",
  "nb_researchers_other_pp",
  "nb_researchers_other_etp",
  "nb_post_phd_student_pp",
  "nb_post_phd_student_etp",
  "nb_phd_student_pp",
  "nb_phd_student_etp",
  "nb_cdi_researchers_pp",
  "nb_cdi_researchers_etp",
  "nb_cdd_researchers_pp",
  "nb_cdd_researchers_etp",
  "nb_teacher_researchers_pp",
  "nb_teacher_researchers_etp",
  "nb_pu_ph_pp",
  "nb_pu_ph_etp",
  "nb_hosp_others_pp",
  "nb_hosp_others_etp",
  "nb_ir_inserm_pp",
  "nb_ir_inserm_etp",
  "nb_ir_non_inserm_pp",
  "nb_ir_non_inserm_etp",
  "nb_ita_others_pp",
  "nb_ita_others_etp",
  "nb_cdd_ir_pp",
  "nb_cdd_ir_etp",
  "nb_cdd_others_pp",
  "nb_cdd_others_etp",
  "nb_admin_pp",
  "nb_admin_etp",
  "active",
  "comment"
];

const teamsQueries = crudQueries(
  "teams",
  fieldsForInsertAndUpdate,
  ["id"],
  fields
);

teamsQueries.selectPage
  .table("teams JOIN structures ON teams.structure_code = structures.id")
  .returnFields([
    ...fields,
    `(${selectNbAccountStructures})::INT AS nb_structure_account`,
    `(${selectNbAccountTeams})::INT AS nb_team_account`,
    `(${selectNbAccountIndividual})::INT AS nb_individual_account`
  ]);

teamsQueries.selectOne.returnFields(fieldsForInsertAndUpdate);
teamsQueries.insertOne.returnFields(fieldsForInsertAndUpdate);
teamsQueries.updateOne.returnFields(fieldsForInsertAndUpdate);

export default {
  ...teamsQueries
};
