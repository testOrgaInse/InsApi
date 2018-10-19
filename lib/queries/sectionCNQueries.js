import {
  crudQueries,
  selectPageQuery,
  selectByOrderedFieldValuesQuery
} from "co-postgres-queries";

const returnFields = ["id", "name", "code", "comment"];

const adminReturnFields = [...returnFields];

const sectionCNQueries = crudQueries(
  "section_cn",
  returnFields,
  ["id"],
  returnFields
);

sectionCNQueries.selectOne.returnFields(adminReturnFields);

sectionCNQueries.selectPage
  .groupByFields(["section_cn.id"])
  .returnFields(
    adminReturnFields.map(field => {
      if (field.match(/ARRAY/)) {
        return field;
      }

      return `section_cn.${field}`;
    })
  )
  .searchableFields([
    "section_cn.id",
    "section_cn.name",
    "section_cn.code",
    "section_cn.comment"
  ]);

const selectByIds = selectByOrderedFieldValuesQuery("section_cn", "id", [
  "id",
  "code",
  "name"
]);
const selectBy = selectPageQuery(
  "section_cn",
  ["name"],
  ["id", "code", "name"]
);

export default {
  ...sectionCNQueries,
  selectByIds,
  selectBy
};
