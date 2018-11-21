import koa from "koa";
import mount from "koa-mount";
import route from "koa-route";
import jwt from "koa-jwt";
import { auth } from "config";

import postgresCrud from "../../utils/postgresCrud";

import AdminUser from "../../models/AdminUser";
import SectionCN from "../../models/SectionCN";
import Community from "../../models/Community";
import FedeInsermAccounts from "../../models/FedeInsermAccounts";
import StructuresTeamsAccounts from "../../models/StructuresTeamsAccounts";
import RegionalsDelegations from "../../models/RegionalsDelegations";
import Teams from "../../models/Teams";
import Institute from "../../models/Institute";
import Structures from "../../models/Structures";

import { login } from "./login";

const app = koa();
app.use(route.post("/login", login));

app.use(jwt({ secret: auth.adminSecret }));

app.use(mount("/adminUsers", postgresCrud(AdminUser))); // Admin
app.use(mount("/section_cn", postgresCrud(SectionCN))); // Commissions spécialisées
app.use(mount("/communities", postgresCrud(Community))); // Communautés
app.use(mount("/individual_account_fede", postgresCrud(FedeInsermAccounts))); // Comptes fédéinserm
app.use(
  mount("/account_structures_teams", postgresCrud(StructuresTeamsAccounts))
); // Comptes structures et teams
app.use(mount("/regionals_delegations", postgresCrud(RegionalsDelegations))); // délégations régionales
app.use(mount("/institutes", postgresCrud(Institute))); // IT
app.use(mount("/structures", postgresCrud(Structures))); // Structures
app.use(mount("/teams", postgresCrud(Teams)));

export default app;
