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
  "director_mail",
  "rh",
  "rh_mail",
  "rri",
  "website",
  "code"
];

const regionalsDelegationsQueries = crudQueries(
  "regionals_delegations",
  fields,
  ["id"]
);
regionalsDelegationsQueries.selectOne.returnFields();

regionalsDelegationsQueries.selectPage
  .groupByFields(["regionals_delegations.id"])
  .searchableFields([
    "regionals_delegations.name",
    "regionals_delegations.code",
    "regionals_delegations.director"
  ])
  .returnFields([
    "regionals_delegations.id",
    "regionals_delegations.name",
    "regionals_delegations.code",
    "regionals_delegations.director"
  ]);

const selectBy = selectPageQuery("regionals_delegations", ["id"], fields);
const selectByIds = selectByOrderedFieldValuesQuery(
  "regionals_delegations",
  "id",
  fields
);

export default {
  ...regionalsDelegationsQueries,
  selectByIds,
  selectBy
};
