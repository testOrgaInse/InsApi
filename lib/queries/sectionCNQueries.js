import {
  crudQueries,
  selectPageQuery,
  selectByOrderedFieldValuesQuery
} from "co-postgres-queries";

const returnFields = ["id", "name", "code", "comment"];

const adminReturnFields = [...returnFields];

const sectionCNQueries = crudQueries(
  "section_cn",
  ["name", "code", "comment"],
  ["id"],
  ["id", "name", "code", "comment"]
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

const selectByUnitId = selectPageQuery(
  "section_cn JOIN unit_section_cn ON (section_cn.id = unit_section_cn.section_cn_id)",
  ["unit_id"],
  ["id", "unit_id", "code", "name", "index"]
);
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
  selectByUnitId,
  selectByIds,
  selectBy
};
