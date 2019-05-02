import config, { auth } from "config";
import jwt from "koa-jwt";
import body from "co-body";
import iconv from "iconv-lite";

const decode = value => {
  if (!value) {
    return undefined;
  }
  return iconv.decode(new Buffer(value, "binary"), "utf-8");
};

export const renaterLogin = function* login() {
  const renaterHeader = config.fakeLogin
    ? {
        cookie: "_shibsession_id=_sessionid",
        sn: "idfr",
        givenname: "developer",
        mail: "ngoura@idfr.net",
        o: "INSERM",
        uid: "tester.10"
      }
    : this.request.header;

  if (
    !renaterHeader.uid ||
    // !renaterHeader.sn ||
    // !renaterHeader.givenname ||
    !renaterHeader.mail
  ) {
    return (this.status = 401);
  }

  const cookie =
    renaterHeader.cookie &&
    renaterHeader.cookie
      .split("; ")
      .filter(value => value.match(/^_shibsession_/))[0];
  if (!cookie) {
    return (this.status = 401);
  }

  if (renaterHeader.mail.includes(";")) {
    renaterHeader.mail = renaterHeader.mail.split(";")[0];
  }

  console.log(renaterHeader.uid);
  let user = yield this.fedeInsermAccountsQueries.selectOneByUid(
    renaterHeader.uid
  );

  console.log("=========");
  console.log(user);

  if (user && user.uid) {
    yield this.fedeInsermAccountsQueries.upsertOnePerUid({
      uid: renaterHeader.uid,
      lastname: decode(renaterHeader.sn),
      firstname: decode(renaterHeader.givenname),
      inserm_email: decode(renaterHeader.mail),
      register_date: new Date(),
      last_connection: renaterHeader["shib-authentication-instant"],
      community: "proxy"
    });
  } else {
    yield this.fedeInsermAccountsQueries.insertOne({
      uid: renaterHeader.uid,
      lastname: decode(renaterHeader.sn),
      firstname: decode(renaterHeader.givenname),
      inserm_email: decode(renaterHeader.mail),
      register_date: new Date(),
      last_connection: renaterHeader["shib-authentication-instant"],
      community: "proxy"
    });
  }

  user = yield this.fedeInsermAccountsQueries.selectOneByUid(renaterHeader.uid);

  const tokenData = {
    id: user.id,
    shib: cookie,
    username: `${user.firstname} ${user.lastname}`,
    domains: user.community,
    origin: "fede_inserm",
    exp: Math.ceil(Date.now() / 1000) + auth.expiresIn
  };

  const cookieToken = jwt.sign(tokenData, auth.cookieSecret);

  this.cookies.set("insapi_token", cookieToken, { httpOnly: true });
  this.redirect(decodeURIComponent(this.query.origin));
};

export const getLogin = function*() {
  this.body = {
    id: this.state.cookie.id,
    username: this.state.cookie.username,
    domains: this.state.cookie.domains,
    origin: this.state.cookie.origin || "structures_teams",
    token
  };
};

export const login = function* login() {
  const { username, password } = yield body(this);
  const account = yield this.structuresTeamsAccountsQueries.authenticate(
    username,
    password
  );

  if (account) {
    const { id, domains, groups } = account;

    const tokenData = {
      id,
      username,
      domains,
      groups,
      origin: "structures_teams",
      exp: Math.ceil(Date.now() / 1000) + auth.expiresIn
    };
    const cookieToken = jwt.sign(tokenData, auth.cookieSecret);

    const headerToken = jwt.sign(tokenData, auth.headerSecret);

    this.cookies.set("insapi_token", cookieToken, { httpOnly: true });

    this.body = {
      token: headerToken,
      domains,
      username
    };

    return;
  }

  this.status = 401;
};
