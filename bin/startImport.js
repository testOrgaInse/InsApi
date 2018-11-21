require("babel-register");

const fs = require("fs");
const { promisify } = require("util");
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

const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

(async () => {
  try {
    await writeFile("logs/import.log", "DROP TABLE\n");
    await dropTables();
    await appendFile("logs/import.log", "IMPORT COMMUNITY\n");
    await importCommunity();
    await appendFile("logs/import.log", "IMPORT REGIONALS DELEGATIONS\n");
    await importRegionalsDelegations();
    await appendFile("logs/import.log", "IMPORT SECTION CN\n");
    await importSectionCn();
    await appendFile("logs/import.log", "IMPORT INSTITUTE\n");
    await importInstitute();
    await appendFile("logs/import.log", "IMPORT STRUCTURE\n");
    await importStructures();
    await appendFile("logs/import.log", "IMPORT TEAM\n");
    await importTeams();
    await appendFile("logs/import.log", "IMPORT ACCOUNT STRUCTURES TEAMS\n");
    await importAccountStructuresTeams();
    await appendFile("logs/import.log", "IMPORT INDIVIDUAL ACCOUNT FEDE\n");
    await importIndividualAccountFede();
    await appendFile("logs/import.log", "FIN DES IMPORTS\n");
    process.exit(0);
  } catch (error) {
    await fs.writeFile("logs/import.log", error);
  }
})();
