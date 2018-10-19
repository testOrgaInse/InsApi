import {
  crudQueries,
  selectPageQuery,
  selectByOrderedFieldValuesQuery
} from "co-postgres-queries";

const instituteQueries = crudQueries(
  "institute",
  ["id"],
  ["id", "name", "address", "phone", "mail", "manager", "mail_manager", "dr"]
);
instituteQueries.selectOne.returnFields([
  "id",
  "name",
  "address",
  "phone",
  "mail",
  "manager",
  "mail_manager",
  "dr"
]);

instituteQueries.selectPage
  .groupByFields(["institute.id"])
  .searchableFields(["institute.id", "institute.name"])
  .returnFields(["institute.id", "institute.name"]);

const selectByJanusAccountId = selectPageQuery(
  "institute JOIN janus_account_institute ON (institute.id = janus_account_institute.institute_id)",
  ["janus_account_id"],
  ["id", "janus_account_id", "name", "index"]
);

const selectByInistAccountId = selectPageQuery(
  "institute JOIN inist_account_institute ON (institute.id = inist_account_institute.institute_id)",
  ["inist_account_id"],
  ["id", "inist_account_id", "name", "index"]
);

const selectByUnitId = selectPageQuery(
  "institute JOIN unit_institute ON (institute.id = unit_institute.institute_id)",
  ["unit_id"],
  ["id", "unit_id", "name", "index"]
);

const selectBy = selectPageQuery("institute", ["name"], ["id", "name"]);
const selectByIds = selectByOrderedFieldValuesQuery("institute", "id", [
  "id",
  "name"
]);

export default {
  ...instituteQueries,
  selectByJanusAccountId,
  selectByInistAccountId,
  selectByUnitId,
  selectBy,
  selectByIds
};
