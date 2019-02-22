import koa from "koa";
import mount from "koa-mount";
import route from "koa-route";

import StructuresTeamsAccounts from "../../models/StructuresTeamsAccounts";
import postgresCrud from "../../utils/postgresCrud";

export const get = function*(next) {
  if (!this.query || (this.query._perPage && this.query._perPage != 100000)) {
    yield next;
    return;
  }
  const structuresTeamsAccountsQueries = StructuresTeamsAccounts(this.postgres);

  this.body = yield structuresTeamsAccountsQueries.selectAllForExport();
  const totalCount = this.body.length;
  this.set("X-Total-Count", totalCount);
  this.set("Access-Control-Expose-Headers", "X-Total-Count");
};

const app = koa();

app.use(route.get("/", get));
app.use(mount("/", postgresCrud(StructuresTeamsAccounts)));

export default app;
