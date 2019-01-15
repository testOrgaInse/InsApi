import koa from "koa";
import mount from "koa-mount";
import route from "koa-route";

import Structures from "../../models/Structures";
import postgresCrud from "../../utils/postgresCrud";

export const get = function*(next) {
  if (
    !this.query ||
    (this.query.perPage && Number(this.query._perPage) >= 1000)
  ) {
    yield next;
    return;
  }
  const structuresQueries = Structures(this.postgres);

  this.body = yield structuresQueries.selectAllForExport();
  const totalCount = this.body.length;
  this.set("X-Total-Count", totalCount);
  this.set("Access-Control-Expose-Headers", "X-Total-Count");
};

const app = koa();

app.use(route.get("/", get));
app.use(mount("/", postgresCrud(Structures)));

export default app;
