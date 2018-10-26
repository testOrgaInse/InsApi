import {
  crudQueries,
  selectPageQuery,
  selectByOrderedFieldValuesQuery
} from "co-postgres-queries";

const fields = [
  "id",
  "name",
  "address",
  "phone",
  "mail",
  "director",
  "mail_director",
  "code"
];

const instituteQueries = crudQueries("institute", fields, ["id"]);
instituteQueries.selectOne.returnFields();

instituteQueries.selectPage
  .groupByFields(["institute.id"])
  .searchableFields(["institute.name", "institute.code"])
  .returnFields(["institute.id", "institute.name", "institute.code"]);

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

const selectBy = selectPageQuery("institute", ["id"], fields);
const selectByIds = selectByOrderedFieldValuesQuery("institute", "id", fields);

export default {
  ...instituteQueries,
  selectByJanusAccountId,
  selectByInistAccountId,
  selectByUnitId,
  selectBy,
  selectByIds
};
