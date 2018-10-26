import { crudQueries } from "co-postgres-queries";

const crud = crudQueries(
  "community",
  ["name", "gate", "user_id", "password", "profile", "ebsco"],
  ["id"],
  ["id", "name", "gate", "user_id", "password", "profile", "ebsco"],
  []
);

export default {
  ...crud
};
