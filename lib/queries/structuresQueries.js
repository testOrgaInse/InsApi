import { crudQueries } from "co-postgres-queries";

const fields = [
  "structures.id",
  "structures.structure_type",
  "structures.iunop_code",
  "structures.code",
  "structures.name",
  "structures.number_of_certified_team",
  "structures.regional_delegation",
  "structures.principal_it",
  "structures.specialized_commission",
  "structures.community",
  "structures.site",
  "structures.street",
  "structures.address_supplement",
  "structures.postal_code",
  "structures.city",
  "structures.country",
  "structures.director_lastname",
  "structures.director_firstname",
  "structures.director_email",
  "structures.email",
  "structures.dc_lastname",
  "structures.dc_firstname",
  "structures.dc_phone",
  "structures.dc_email",
  "structures.mixt_university",
  "structures.cnrs_mixity",
  "structures.other_mixity",
  "structures.total_etp_effectiv",
  "structures.nb_researchers_inserm_pp",
  "structures.nb_researchers_inserm_etp",
  "structures.nb_researchers_crns_pp",
  "structures.nb_researchers_crns_etp",
  "structures.nb_researchers_other_pp",
  "structures.nb_researchers_other_etp",
  "structures.nb_post_phd_student_pp",
  "structures.nb_post_phd_student_etp",
  "structures.nb_phd_student_pp",
  "structures.nb_phd_student_etp",
  "structures.nb_cdi_researchers_pp",
  "structures.nb_cdi_researchers_etp",
  "structures.nb_cdd_researchers_pp",
  "structures.nb_cdd_researchers_etp",
  "structures.nb_teacher_researchers_pp",
  "structures.nb_teacher_researchers_etp",
  "structures.nb_pu_ph_pp",
  "structures.nb_pu_ph_etp",
  "structures.nb_hosp_others_pp",
  "structures.nb_hosp_others_etp",
  "structures.nb_ir_inserm_pp",
  "structures.nb_ir_inserm_etp",
  "structures.nb_ir_non_inserm_pp",
  "structures.nb_ir_non_inserm_etp",
  "structures.nb_ita_others_pp",
  "structures.nb_ita_others_etp",
  "structures.nb_cdd_ir_pp",
  "structures.nb_cdd_ir_etp",
  "structures.nb_cdd_others_pp",
  "structures.nb_cdd_others_etp",
  "structures.nb_admin_pp",
  "structures.nb_admin_etp",
  "structures.nb_structures_accounts",
  "structures.nb_teams_account",
  "structures.nb_personal_accounts",
  "structures.active",
  "structures.comment"
];

const structuresQueries = crudQueries("structures", fields, ["id"], fields);

structuresQueries.selectOne.returnFields();

structuresQueries.selectPage.searchableFields(fields).returnFields(fields);

export default {
  ...structuresQueries
};
