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
  "manager",
  "manager_mail",
  "rh",
  "rh_mail",
  "rri",
  "rri_mail",
  "website",
  "code"
];

const adminReturnFields = [...returnFields];

const regionalsDelegationsQueries = crudQueries(
  "regionals_delegations",
  returnFields,
  ["id"],
  returnFields
);

regionalsDelegationsQueries.selectOne.returnFields(adminReturnFields);

regionalsDelegationsQueries.selectPage
  .groupByFields(["regionals_delegations.id"])
  .returnFields(
    adminReturnFields.map(field => {
      if (field.match(/ARRAY/)) {
        return field;
      }

      return `regionals_delegations.${field}`;
    })
  )
  .searchableFields(["name"]);

const selectByIds = selectByOrderedFieldValuesQuery(
  "regionals_delegations",
  "id",
  returnFields
);
const selectBy = selectPageQuery(
  "regionals_delegations",
  ["name"],
  returnFields
);

export default {
  ...regionalsDelegationsQueries,
  selectByIds,
  selectBy
};
