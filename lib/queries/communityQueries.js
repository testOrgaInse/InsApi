import { crudQueries } from "co-postgres-queries";

const fields = ["id", "name", "gate"];

const crud = crudQueries("community", fields, ["id"], fields);

export default {
  ...crud
};
