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
    !renaterHeader.sn ||
    !renaterHeader.givenname ||
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

  const similarAccounts = yield this.fedeInsermAccountsQueries.getSimilarUid(
    renaterHeader.uid
  );

  const [code, name] = (renaterHeader.refscientificoffice || "").split("->");
  yield this.instituteQueries.insertInstituteIfNotExists(code, name);

  if (renaterHeader.ou) {
    yield this.instituteQueries.upsertOnePerCode({ code: renaterHeader.ou });
  }
  const institute = renaterHeader.ou
    ? yield this.instituteQueries.selectOneByCode({ code: renaterHeader.ou })
    : null;

  if (renaterHeader.mail.includes(";")) {
    renaterHeader.mail = renaterHeader.mail.split(";")[0];
  }

  yield this.fedeInsermAccountsQueries.upsertOnePerUid({
    uid: renaterHeader.uid,
    lastname: decode(renaterHeader.sn),
    firstname: decode(renaterHeader.givenname),
    email: decode(renaterHeader.mail),
    last_connection: renaterHeader["shib-authentication-instant"],
    itmo_principal: institute && institute.id,
    community: "proxy"
  });

  const user = yield this.fedeInsermAccountsQueries.selectOneByUid(
    renaterHeader.uid
  );

  if (similarAccounts.length) {
    const mail = this.getSimilarUidAlertMail(user, similarAccounts);
    yield this.sendMail(mail);
  }

  const domains = user.community;

  const tokenData = {
    id: user.id,
    shib: cookie,
    username: `${user.firstname} ${user.lastname}`,
    domains,
    favorite_domain: domains,
    origin: "fede_inserm",
    exp: Math.ceil(Date.now() / 1000) + auth.expiresIn
  };

  const cookieToken = jwt.sign(tokenData, auth.cookieSecret);

  const headerToken = jwt.sign(tokenData, auth.headerSecret);

  this.cookies.set("insapi_token", cookieToken, { httpOnly: true });
  this.redirect(decodeURIComponent(this.query.origin));
};

export const getLogin = function*() {
  /*let favouriteResources = yield this.fedeInsermAccountsQueries.getFavouriteResources(
    this.state.cookie.id
  );
  if (!favouriteResources) {
    favouriteResources = yield this.revueQueries.selectRevueByDomains([
      this.state.cookie.favorite_domain,
      ...this.state.cookie.domains
    ]);
  }*/

  this.body = {
    id: this.state.cookie.id,
    username: this.state.cookie.username,
    domains: this.state.cookie.domains,
    favorite_domain: this.state.cookie.favorite_domain,
    //favouriteResources,
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
