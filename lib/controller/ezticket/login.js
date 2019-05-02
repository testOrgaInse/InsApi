import body from "co-body";
import jwt from "koa-jwt";
import { auth } from "config";

import { generateSalt } from "../../services/passwordHash";
import loginTemplate from "./loginTemplate";
import getLanguage from "../../services/getLanguage";

export const login = function* login(next) {
  const { username, password } = yield body(this);
  const account = yield this.structuresTeamsAccountsQueries.authenticate(
    username,
    password
  );
  if (account) {
    const { id, domains, groups } = account;

    const shib = yield generateSalt();

    const tokenData = {
      id,
      username,
      domains,
      groups,
      shib,
      origin: "structures_teams",
      exp: Math.ceil(Date.now() / 1000) + auth.expiresIn
    };

    const cookieToken = jwt.sign(tokenData, auth.cookieSecret);

    this.cookies.set("insapi_token", cookieToken, { httpOnly: true });
    this.account = account;

    return yield next;
  }
  const language = getLanguage(this.request.headers);
  this.status = 401;
  this.body = loginTemplate(language, 401);
};
