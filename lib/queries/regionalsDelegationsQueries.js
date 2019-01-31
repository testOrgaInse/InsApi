import { crudQueries, selectPageQuery } from "co-postgres-queries";

const fields = [
  "id",
  "name",
  "code",
  "address",
  "phone",
  "director_name",
  "director_mail",
  "rh_name",
  "rh_mail",
  "rri_name",
  "rri_mail",
  "website"
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

const SelectById = selectPageQuery("regionals_delegations", "id", fields);
export default {
  ...regionalsDelegationsQueries,
  SelectById
};
