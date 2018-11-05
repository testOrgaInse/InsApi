import { crudQueries } from "co-postgres-queries";

const crud = crudQueries(
  "community",
  ["name", "gate"],
  ["id"],
  ["id", "name", "gate"],
  []
);

export default {
  ...crud
};
