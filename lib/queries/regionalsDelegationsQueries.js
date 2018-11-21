import { crudQueries } from "co-postgres-queries";

const fields = [
  "id",
  "name",
  "address",
  "phone",
  "dr_mail",
  "director_name",
  "director_mail",
  "rh_name",
  "rh_mail",
  "rri_name",
  "rri_mail",
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
  .groupByFields(["id"])
  .searchableFields(fields.map(field => `regionals_delegations.${field}`))
  .returnFields(fields);

export default {
  ...regionalsDelegationsQueries
};
