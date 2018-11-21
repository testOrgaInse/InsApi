import { crudQueries } from "co-postgres-queries";

const fields = ["id", "name", "code", "comment"];

const sectionCNQueries = crudQueries("section_cn", fields, ["id"], fields);

sectionCNQueries.selectPage
  .groupByFields(["id"])
  .returnFields(fields)
  .searchableFields(fields.map(field => `section_cn.${field}`));

export default {
  ...sectionCNQueries
};
