import { crudQueries } from "co-postgres-queries";

const fields = [
  "id",
  "name",
  "structure_type",
  "iunop_code",
  "code",
  "number_of_certified_team",
  "regional_delegation",
  "principal_it",
  "specialized_commission",
  "community",
  "site",
  "street",
  "address_supplement",
  "postal_code",
  "city",
  "country",
  "director_lastname",
  "director_firstname",
  "director_email",
  "email",
  "dc_lastname",
  "dc_firstname",
  "dc_phone",
  "dc_email",
  "mixt_university",
  "cnrs_mixity",
  "other_mixity",
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
  "nb_structures_accounts",
  "nb_teams_account",
  "nb_personal_accounts",
  "active",
  "comment"
];

const structuresQueries = crudQueries("structures", fields, ["id"], fields);

structuresQueries.selectOne.returnFields();

structuresQueries.selectPage
  .searchableFields(fields.map(field => `structures.${field}`))
  .returnFields(fields);

export default {
  ...structuresQueries
};
