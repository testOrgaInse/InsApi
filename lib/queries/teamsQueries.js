import {
  crudQueries,
  upsertOneQuery,
  batchUpsertQuery,
  selectOneQuery,
  selectPageQuery,
  selectByOrderedFieldValuesQuery
} from "co-postgres-queries";

const fields = [
  "id",
  "id_structure",
  "code",
  "regional_delegation",
  "site",
  "team_number",
  "principal_lastname",
  "principal_firstname",
  "principal_email",
  "principal_it",
  "specialized_commission",
  "community",
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

const teamsQueries = crudQueries("teams", fields, ["id"], fields);

teamsQueries.selectOne.returnFields();

teamsQueries.selectPage
  .groupByFields(["id"])
  .searchableFields(["name", "code"])
  .returnFields(fields);
const selectBy = selectPageQuery("teams", ["id"], fields);
const selectByIds = selectByOrderedFieldValuesQuery("teams", "id", fields);

export default {
  ...teamsQueries,
  selectBy,
  selectByIds
};
