import koa from "koa";
import route from "koa-route";
import jwt from "koa-jwt";
import { auth } from "config";
import _ from "lodash";
import Community from "../../models/Community";
import Institute from "../../models/Institute";
import Structures from "../../models/Structures";
import FedeInsermAccounts from "../../models/FedeInsermAccounts";
import { login, renaterLogin, getLogin } from "./login";

const app = koa();

app.use(function*(next) {
  this.communityQueries = Community(this.postgres);
  this.instituteQueries = Institute(this.postgres);
  this.structuresQueries = Structures(this.postgres);
  this.fedeInsermAccountsQueries = FedeInsermAccounts(this.postgres);
  yield next;
});

app.use(route.get("/login_renater", renaterLogin));
app.use(route.post("/login", login));

app.use(function*(next) {
  const domainName = this.request.path.split("/")[1];
  if (!["getLogin"].includes(domainName)) {
    this.domain = yield this.communityQueries.selectOneByName(domainName);
  }
  yield next;
});

app.use(
  jwt({ secret: auth.cookieSecret, cookie: "insapi_token", key: "cookie" })
);
app.use(route.post("/getLogin", getLogin));
app.use(jwt({ secret: auth.headerSecret, key: "header" }));

app.use(function*(next) {
  if (!this.state.header || !this.state.cookie) {
    return (this.status = 401);
  }
  if (!_.isEqual(this.state.header, this.state.cookie)) {
    return (this.status = 401);
  }

  yield next;
});

export default app;
