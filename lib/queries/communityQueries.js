import { crudQueries, selectOneQuery } from "co-postgres-queries";

const fields = ["id", "name", "gate"];

const crud = crudQueries("community", fields, ["name"], fields);

const selectOneByName = selectOneQuery("community", ["name"], ["*"]);
const selectOneByGate = selectOneQuery("community", ["gate"], ["*"]);

export default {
  ...crud,
  selectOneByName,
  selectOneByGate
};
