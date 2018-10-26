import {
  crudQueries,
  selectPageQuery,
  selectByOrderedFieldValuesQuery
} from "co-postgres-queries";

const returnFields = [
  "id",
  "name",
  "address",
  "phone",
  "mail",
  "director",
  "director_mail",
  "rh",
  "rh_mail",
  "rri",
  "rri_mail",
  "website",
  "code"
];

const regionalsDelegationsQueries = crudQueries(
  "regionals_delegations",
  returnFields,
  ["id"],
  returnFields
);

const selectByIds = selectByOrderedFieldValuesQuery(
  "regionals_delegations",
  "id",
  returnFields
);
const selectBy = selectPageQuery(
  "regionals_delegations",
  ["name", "code", "director"],
  returnFields
);

export default {
  ...regionalsDelegationsQueries,
  selectByIds,
  selectBy
};
