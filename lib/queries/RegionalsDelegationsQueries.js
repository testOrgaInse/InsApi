import { crudQueries } from "co-postgres-queries";

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

const crud = crudQueries(
  "regionals_delegations",
  [
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
  ],
  ["id"],
  returnFields,
  []
);

crud.selectPage
  .groupByFields(["id"])
  .returnFields(
    returnFields.map(field => {
      if (field.match(/ARRAY/)) {
        return field;
      }

      return field;
    })
  )
  .searchableFields(["code", "name", "director"]);

export default {
  ...crud
};
