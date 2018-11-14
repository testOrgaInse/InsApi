import { crudQueries } from "co-postgres-queries";

const fields = [
  "id",
  "login",
  "password",
  "type_of_code",
  "structure_type",
  "structure_code",
  "team_number",
  "community",
  "register_date",
  "expiration_date",
  "active",
  "comment"
];

const accountsStructuresTeamsQueries = crudQueries(
  "account_structures_teams",
  fields,
  ["id"],
  fields
);

accountsStructuresTeamsQueries.selectOne.returnFields();

accountsStructuresTeamsQueries.selectPage
  .searchableFields(fields.map(field => `account_structures_teams.${field}`))
  .returnFields(fields);

export default {
  ...accountsStructuresTeamsQueries
};
