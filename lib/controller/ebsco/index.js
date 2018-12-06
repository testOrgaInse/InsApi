import koa from "koa";
import route from "koa-route";
import jwt from "koa-jwt";
import { auth } from "config";
import _ from "lodash";

import Community from "../../models/Community";
import Institute from "../../models/Institute";
import Structures from "../../models/Structures";
import FedeInsermQueries from "../../models/FedeInsermAccounts";
import ebscoToken from "../../services/ebscoToken";
import ebscoAuthentication from "../../services/ebscoAuthentication";
import ebscoSession from "../../services/ebscoSession";
import { login, renaterLogin, getLogin } from "./login";
import sendMail from "../../services/sendMail";

const app = koa();

app.use(function*(next) {
  this.communityQueries = Community(this.postgres);
  this.instituteQueries = Institute(this.postgres);
  this.structuresQueries = Structures(this.postgres);
  this.fedeInsermAccountsQueries = FedeInsermQueries(this.postgres);
  this.sendMail = sendMail;
  yield next;
});

app.use(route.get("/login_renater", renaterLogin));
app.use(route.post("/login", login));

app.use(function*(next) {
  const domainName = this.request.path.split("/")[1];
  if (
    ![
      "getLogin",
      "profile",
      "history",
      "favourite_resources",
      "search_alert"
    ].includes(domainName)
  ) {
    this.domain = yield this.communityQueries.selectOneByName(domainName);
  }
  yield next;
});

app.use(function*(next) {
  const allDomains = (yield this.communityQueries.selectPage()).map(
    domain => domain.name
  );
  this.ebscoToken = ebscoToken(
    "guest",
    allDomains,
    ebscoSession,
    ebscoAuthentication
  );
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

app.use(function*(next) {
  this.ebscoToken
    .username(this.state.header.username)
    .domains(this.state.header.domains || []);
  yield next;
});

export default app;
