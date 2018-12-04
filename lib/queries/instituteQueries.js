import {
  crudQueries,
  selectPageQuery,
  selectByOrderedFieldValuesQuery,
  selectOneQuery,
  upsertOneQuery
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
instituteQueries.selectOne.returnFields(fields);

instituteQueries.selectPage
  .groupByFields(["id"])
  .searchableFields(fields.map(field => `institute.${field}`))
  .returnFields(fields);

const selectBy = selectPageQuery("institute", ["id"], fields);
const selectByIds = selectByOrderedFieldValuesQuery("institute", "id", fields);
const selectOneByCode = selectOneQuery("institute", ["code"], fields);
const upsertOnePerCode = upsertOneQuery("institute", ["code"], fields);

export default {
  ...instituteQueries,
  selectBy,
  selectByIds,
  selectOneByCode,
  upsertOnePerCode
};
