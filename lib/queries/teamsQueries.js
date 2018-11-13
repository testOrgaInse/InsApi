import { crudQueries } from "co-postgres-queries";

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
  "teams.nb_personal_accounts",
  "teams.active",
  "teams.comment",
  "structures.regional_delegation",
  "structures.site",
  "structures.city",
  "structures.mixt_university",
  "structures.cnrs_mixity",
  "structures.other_mixity"
];

const teamsQueries = crudQueries("teams", fields, ["teams.id"], fields);
teamsQueries.selectOne.returnFields();

teamsQueries.selectPage
  .table("teams JOIN structures ON teams.structure_code = structures.code")
  .searchableFields(fields)
  .returnFields(fields);

export default {
  ...teamsQueries
};
