require("babel-register");

const { dropTables } = require("./imports/dropTables");
const { importCommunity } = require("./imports/community");
const {
  importRegionalsDelegations
} = require("./imports/regionals_delegations");
const { importSectionCn } = require("./imports/section_cn");
const { importInstitute } = require("./imports/institute");
const { importStructures } = require("./imports/structures");
const { importTeams } = require("./imports/teams");
const {
  importAccountStructuresTeams
} = require("./imports/account_structures_teams");
const {
  importIndividualAccountFede
} = require("./imports/individual_account_fede");
if (process.argv[2]) {
}

(async () => {
  try {
    console.log("====TRUNCATE TABLE====");
    await dropTables();
    console.log("====COMMUNITY====");
    await importCommunity();
    console.log("====REGIONALS DELEGATIONS====");
    await importRegionalsDelegations();
    console.log("====SECTION CN====");
    await importSectionCn();
    console.log("====INSTITUTE====");
    await importInstitute();
    console.log("====STRUCTURE====");
    await importStructures();
    console.log("====TEAM====");
    await importTeams();
    console.log("====ACCOUNT STRUCTURES TEAMS====");
    await importAccountStructuresTeams();
    console.log("====INDIVIDUAL ACCOUNT FEDE====");
    await importIndividualAccountFede();
    console.log("====END====");
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
})();
