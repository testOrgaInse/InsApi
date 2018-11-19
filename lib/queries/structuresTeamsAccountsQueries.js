import { crudQueries } from "co-postgres-queries";

const fields = [
  "account_structures_teams.id",
  "account_structures_teams.login",
  "account_structures_teams.password",
  "account_structures_teams.type_of_code",
  "account_structures_teams.structure_type",
  "account_structures_teams.structure_code",
  "account_structures_teams.team_number",
  "account_structures_teams.community",
  "account_structures_teams.register_date",
  "account_structures_teams.expiration_date",
  "account_structures_teams.active",
  "account_structures_teams.comment",
  "teams.name",
  "teams.principal_lastname",
  "teams.principal_firstname",
  "teams.principal_email",
  "teams.principal_it",
  "teams.specialized_commission",
  "structures.regional_delegation",
  "structures.site",
  "structures.city",
  "structures.mixt_university",
  "structures.cnrs_mixity",
  "structures.other_mixity"
];

const fieldsForInsertAndUpdate = [
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

const structuresTeamsAccountsQueries = crudQueries(
  "account_structures_teams",
  fieldsForInsertAndUpdate,
  ["id"],
  fields
);

structuresTeamsAccountsQueries.selectPage
  .table(
    `account_structures_teams LEFT JOIN structures ON account_structures_teams.structure_code = structures.id
     LEFT JOIN teams ON account_structures_teams.team_number = teams.id`
  )
  .returnFields(fields);

structuresTeamsAccountsQueries.selectOne.returnFields(fieldsForInsertAndUpdate);
structuresTeamsAccountsQueries.insertOne.returnFields(fieldsForInsertAndUpdate);
structuresTeamsAccountsQueries.updateOne.returnFields(fieldsForInsertAndUpdate);

export default {
  ...structuresTeamsAccountsQueries
};