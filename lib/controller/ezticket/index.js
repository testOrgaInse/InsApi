import koa from "koa";
import route from "koa-route";
import jwt from "koa-jwt";
import { auth } from "config";
import send from "koa-send";
import Community from "../../models/Community";
import StructuresTeamsAccounts from "../../models/StructuresTeamsAccounts";
import generateEZTicket from "../../services/generateEZTicket";
import { login } from "./login";
import loginTemplate from "./loginTemplate";
import errorTemplate from "./errorTemplate";
import getLanguage from "../../services/getLanguage";

const app = koa();

app.use(function*(next) {
  this.communityQueries = Community(this.postgres);
  this.structuresTeamsAccountsQueries = StructuresTeamsAccounts(this.postgres);
  yield next;
});

app.use(
  route.get("/bibinserm.png", function*() {
    yield send(this, "bibinserm.png", { root: __dirname });
  })
);

app.use(
  route.get("/login", function*() {
    const language = getLanguage(this.request.headers);
    this.body = loginTemplate(language);
  })
);

app.use(route.post("/login", login));

app.use(
  jwt({
    secret: auth.cookieSecret,
    cookie: "insapi_token",
    key: "cookie",
    expiresIn: "10h",
    passthrough: true
  })
);

const getEzTicketInfo = function*(ctx) {
  if (ctx.structuresTeamsAccounts) {
    return {
      ...(yield ctx.structuresTeamsAccountsQueries.selectEzTicketInfoForId(
        ctx.structuresTeamsAccounts.id
      )),
      domains: ctx.structuresTeamsAccounts.domains
    };
  }
  if (!ctx.state.cookie) {
    return;
  }

  const { origin, id, domains } = ctx.state.cookie;
  switch (origin) {
    case "inist":
      return {
        ...(yield ctx.structuresTeamsAccountsQueries.selectEzTicketInfoForId(
          id
        )),
        domains
      };
    case "janus":
      return {
        ...(yield ctx.janusAccountQueries.selectEzTicketInfoForId(id)),
        domains
      };
    default:
      return;
  }
};

app.use(function*() {
  const language = getLanguage(this.request.headers);
  if (!this.query.gate) {
    this.status = 500;
    this.body = errorTemplate(language, "noGate");

    return;
  }

  const gate = this.query.gate.split(".")[0];
  const domain = yield this.communityQueries.selectOneByGate(gate);

  if (!domain) {
    this.status = 500;
    this.body = errorTemplate(language, "invalidGate", this.query.gate);
    return;
  }

  const ezTicketInfo = yield getEzTicketInfo(this);
  if (!ezTicketInfo) {
    this.redirect(
      `ezticket/login?gate=${encodeURIComponent(
        this.query.gate
      )}&url=${encodeURIComponent(this.query.url)}`
    );
    return;
  }

  if (
    !ezTicketInfo.domains ||
    ezTicketInfo.domains.indexOf(domain.name) === -1
  ) {
    this.status = 401;
    this.body = errorTemplate(language, "unauthorized");
    return;
  }

  console.log("===ezTicketInfo====");
  console.log("gate", this.query.gate);
  console.log("url", this.query.url);
  console.log(ezTicketInfo);

  const url = generateEZTicket(
    this.query.gate,
    this.query.url,
    ezTicketInfo.username,
    ezTicketInfo.groups
  );
  console.log("url========>");
  console.log(url);
  this.redirect(url);
});

export default app;
