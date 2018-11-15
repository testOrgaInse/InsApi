import { crudQueries } from "co-postgres-queries";

const fields = [
  "id",
  "uid",
  "lastname",
  "firstname",
  "inserm_email",
  "email",
  "structure_type",
  "structure_code",
  "community",
  "team_number",
  "regional_delegation",
  "specialized_commission",
  "uinop_code",
  "structure_name",
  "second_team_code",
  "site",
  "city",
  "itmo_principal",
  "orcid_number",
  "researcher_id",
  "agent_status",
  "agent_function",
  "membership",
  "type_of_assigned_structure",
  "register_date",
  "last_connection",
  "active",
  "comment"
];

const accountsFedeInsermQueries = crudQueries(
  "individual_account_fede",
  fields,
  ["id"],
  fields
);

accountsFedeInsermQueries.selectOne.returnFields();

accountsFedeInsermQueries.selectPage
  .searchableFields(fields.map(field => `individual_account_fede.${field}`))
  .returnFields(fields);

export default {
  ...accountsFedeInsermQueries
};
