import { crudQueries } from "co-postgres-queries";

const fields = [
  "individual_account_fede.id",
  "individual_account_fede.uid",
  "individual_account_fede.lastname",
  "individual_account_fede.firstname",
  "individual_account_fede.inserm_email",
  "individual_account_fede.email",
  "individual_account_fede.structure_type",
  "individual_account_fede.structure_code",
  "individual_account_fede.community",
  "individual_account_fede.team_number",
  "individual_account_fede.regional_delegation",
  "individual_account_fede.specialized_commission",
  "individual_account_fede.uinop_code",
  "individual_account_fede.structure_name",
  "individual_account_fede.secondary_team_code",
  "individual_account_fede.site",
  "individual_account_fede.city",
  "individual_account_fede.itmo_principal",
  "individual_account_fede.orcid_number",
  "individual_account_fede.researcher_id",
  "individual_account_fede.agent_status",
  "individual_account_fede.agent_function",
  "individual_account_fede.membership",
  "individual_account_fede.type_of_assigned_structure",
  "individual_account_fede.register_date",
  "individual_account_fede.last_connection",
  "individual_account_fede.active",
  "individual_account_fede.comment",
  "teams.name"
];

const fieldsForInsertAndUpdate = [
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
  "secondary_team_code",
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
  fieldsForInsertAndUpdate,
  ["id"],
  fields
);

accountsFedeInsermQueries.selectOne.returnFields(fieldsForInsertAndUpdate);

accountsFedeInsermQueries.selectPage
  .table(
    "individual_account_fede JOIN teams ON teams.id = individual_account_fede.team_number"
  )
  .returnFields(fields);

accountsFedeInsermQueries.selectOne.returnFields(fieldsForInsertAndUpdate);
accountsFedeInsermQueries.insertOne.returnFields(fieldsForInsertAndUpdate);
accountsFedeInsermQueries.updateOne.returnFields(fieldsForInsertAndUpdate);

export default {
  ...accountsFedeInsermQueries
};
