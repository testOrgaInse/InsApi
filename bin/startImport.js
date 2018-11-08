require("babel-register");

const { dropTables } = require("./imports/dropTables");
const {
  importRegionalsDelegations
} = require("./imports/regionals_delegations");
const { importSectionCn } = require("./imports/section_cn");
const { importInstitute } = require("./imports/institute");
const { importStructures } = require("./imports/structures");
const { importTeams } = require("./imports/teams");

(async () => {
  try {
    console.log("====TRUNCATE TABLE====");
    await dropTables();
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
    console.log("====END====");
  } catch (error) {
    console.error(error);
  }
})();
