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
  .returnFields(fields);

const selectBy = selectPageQuery("institute", ["id"], fields);
const selectByIds = selectByOrderedFieldValuesQuery("institute", "id", fields);

export default {
  ...instituteQueries,
  selectBy,
  selectByIds
};
