import FedeInsermAccounts from "../../lib/models/FedeInsermAccounts";
import StructuresTeamsAccount from "../../lib/models/StructuresTeamsAccounts";
import AdminUser from "../../lib/models/AdminUser";
import Community from "../../lib/models/Community";
import Institute from "../../lib/models/Institute";
import Structure from "../../lib/models/Structures";
// import Database from "../../lib/models/Database";
import SectionCN from "../../lib/models/SectionCN";
import RegionalsDelegations from "../../lib/models/RegionalsDelegations";

export default function(postgres) {
  const adminUserQueries = AdminUser(postgres);
  const communityQueries = Community(postgres);
  const FedeInsermAccountQueries = FedeInsermAccounts(postgres);
  const StructuresTeamsAccountQueries = StructuresTeamsAccount(postgres);
  const instituteQueries = Institute(postgres);
  const structureQueries = Structure(postgres);
  // const databaseQueries = Database(postgres);
  const sectionCNQueries = SectionCN(postgres);
  const regionalsDelegationsQueries = RegionalsDelegations(postgres);

  function* createAdminUser(data) {
    return yield adminUserQueries.insertOne(data);
  }

  function* createCommunity(data) {
    const defaultCommunity = {
      name: "INSERM",
      gate: "insb"
    };

    return yield communityQueries.insertOne({
      ...defaultCommunity,
      ...data
    });
  }

  function* createIndividualAccount(data) {
    const defaultIndividualAccount = {};

    const IndividualAccount = yield FedeInsermAccountQueries.insertOne({
      ...defaultIndividualAccount,
      ...data
    });

    return {
      ...IndividualAccount
    };
  }

  function* createStructureTeamAccount(data) {
    const defaultStructureTeamAccount = {
      password: "secret"
    };

    const structureTeamAccount = yield StructuresTeamsAccountQueries.insertOne({
      ...defaultStructureTeamAccount,
      ...data
    });

    return {
      ...structureTeamAccount,
      password: data.password
    };
  }

  function* createInstitute(data) {
    const defaultInstitute = {
      code: "53",
      name: "Institut des sciences biologique"
    };
    return yield instituteQueries.insertOne({
      ...defaultInstitute,
      ...data
    });
  }

  function* createStructure(data) {
    const defaultStructure = {
      code: "CIC1401",
      structure_type: "CIC",
      name: "CIC BORDEAUX",
      community: "INSERM"
    };
    return yield structureQueries.insertOne({
      ...defaultStructure,
      ...data
    });
  }

  function* createHistory(data) {
    const defaultHistory = { event: '{ "foo": 42 }' };
    return yield historyQueries.insertOne({
      ...defaultHistory,
      ...data
    });
  }

  // function* createDatabase(data) {
  //   const defaultDatabase = {
  //     name_fr: "réseau du ciel",
  //     name_en: "skynet",
  //     text_fr: "français",
  //     text_en: "english",
  //     url_fr: "http://www.url.fr",
  //     url_en: "http://www.url.en",
  //     community: "INSERM"
  //   };
  //   return yield databaseQueries.insertOne({
  //     ...defaultDatabase,
  //     ...data
  //   });
  // }

  function* createSectionCN(data) {
    const defaultSectionCN = {
      name: "la secion",
      code: "1",
      primary_institutes: [],
      primary_units: []
    };
    return yield sectionCNQueries.insertOne({
      ...defaultSectionCN,
      ...data
    });
  }

  function* createRevue(data) {
    const defaultSectionCN = {
      title: "The revue",
      url: "www.the-revue.com"
    };
    return yield revueQueries.insertOne({
      ...defaultSectionCN,
      ...data
    });
  }

  function* createRegionalsDelegations(data) {
    return yield regionalsDelegationsQueries.insertOne(data);
  }

  function* clear() {
    yield postgres.query({ sql: "DELETE FROM admin_user" });
    yield postgres.query({ sql: "DELETE FROM community CASCADE" });
    yield postgres.query({
      sql: "DELETE FROM individual_account_fede CASCADE"
    });
    yield postgres.query({
      sql: "DELETE FROM account_structures_teams CASCADE"
    });
    yield postgres.query({ sql: "DELETE FROM institute CASCADE" });
    yield postgres.query({ sql: "DELETE FROM structures CASCADE" });
    yield postgres.query({ sql: "DELETE FROM section_cn CASCADE" });
    yield postgres.query({ sql: "DELETE FROM regionals_delegations CASCADE" });
  }

  return {
    createAdminUser,
    createIndividualAccount,
    createStructureTeamAccount,
    createCommunity,
    createInstitute,
    createStructure,
    createSectionCN,
    createRegionalsDelegations,
    clear
  };
}
