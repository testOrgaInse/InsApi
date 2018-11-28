import Teams from "../../../lib/models/Teams";

describe("model Teams", function() {
  let teamsQueries;
  before(function() {
    teamsQueries = Teams(postgres);
  });
  describe("selectOne", function() {
    it("should return one team by id", function*() {
      const community = yield fixtureLoader.createCommunity({
        name: "vie",
        gate: "insb"
      });

      const section = yield fixtureLoader.createSectionCN({
        code: "",
        name: ""
      });

      const institute = yield fixtureLoader.createInstitute({
        name: "dgds",
        code: "ds99"
      });

      const rd = yield fixtureLoader.createRegionalsDelegations({
        name: "Patrick",
        code: "Sebastien"
      });

      const structure = yield fixtureLoader.createStructure({
        structure_type: "CIC",
        iunop_code: "",
        code: "biology",
        name: "BIOMAN",
        number_of_certified_team: 0,
        regional_delegation: rd.id,
        principal_it: institute.id,
        specialized_commission: section.id,
        community: community.name,
        site: "",
        street: "",
        address_supplement: "",
        postal_code: "",
        city: "",
        country: "",
        director_lastname: "",
        director_firstname: "",
        director_email: "",
        email: "",
        dc_lastname: "",
        dc_firstname: "",
        dc_phone: "",
        dc_email: "",
        mixt_university: "",
        cnrs_mixity: "",
        other_mixity: "",
        total_etp_effectiv: 0,
        nb_researchers_inserm_pp: 0,
        nb_researchers_inserm_etp: 0,
        nb_researchers_crns_pp: 0,
        nb_researchers_crns_etp: 0,
        nb_researchers_other_pp: 0,
        nb_researchers_other_etp: 0,
        nb_post_phd_student_pp: 0,
        nb_post_phd_student_etp: 0,
        nb_phd_student_pp: 0,
        nb_phd_student_etp: 0,
        nb_cdi_researchers_pp: 0,
        nb_cdi_researchers_etp: 0,
        nb_cdd_researchers_pp: 0,
        nb_cdd_researchers_etp: 0,
        nb_teacher_researchers_pp: 0,
        nb_teacher_researchers_etp: 0,
        nb_pu_ph_pp: 0,
        nb_pu_ph_etp: 0,
        nb_hosp_others_pp: 0,
        nb_hosp_others_etp: 0,
        nb_ir_inserm_pp: 0,
        nb_individual_account: 0,
        nb_structure_account: 0,
        nb_team_account: 0,
        nb_ir_inserm_etp: 0,
        nb_ir_non_inserm_pp: 0,
        nb_ir_non_inserm_etp: 0,
        nb_ita_others_pp: 0,
        nb_ita_others_etp: 0,
        nb_cdd_ir_pp: 0,
        nb_cdd_ir_etp: 0,
        nb_cdd_others_pp: 0,
        nb_cdd_others_etp: 0,
        nb_admin_pp: 0,
        nb_admin_etp: 0,
        active: true,
        secondary_it: [],
        comment: "a comment."
      });

      const team = yield fixtureLoader.createTeam({
        structure_code: structure.id,
        team_number: "CIC401-1",
        name: "MODULE INNOVATION TECHNOLOGIQUES",
        principal_lastname: "BORDENAVE",
        principal_firstname: "LAURENCE",
        principal_email: "Laurence.Bordenave@chu-bordeaux.fr",
        principal_it: institute.id,
        specialized_commission: section.id,
        total_etp_effectiv: 0,
        nb_researchers_inserm_pp: 0,
        nb_researchers_inserm_etp: 0,
        nb_researchers_crns_pp: 0,
        nb_researchers_crns_etp: 0,
        nb_researchers_other_pp: 0,
        nb_researchers_other_etp: 0,
        nb_post_phd_student_pp: 0,
        nb_post_phd_student_etp: 0,
        nb_phd_student_pp: 0,
        nb_phd_student_etp: 0,
        nb_cdi_researchers_pp: 0,
        nb_cdi_researchers_etp: 0,
        nb_cdd_researchers_pp: 0,
        nb_cdd_researchers_etp: 0,
        nb_teacher_researchers_pp: 0,
        nb_teacher_researchers_etp: 0,
        nb_pu_ph_pp: 0,
        nb_pu_ph_etp: 0,
        nb_hosp_others_pp: 0,
        nb_hosp_others_etp: 0,
        nb_ir_inserm_pp: 0,
        nb_ir_inserm_etp: 0,
        nb_ir_non_inserm_pp: 0,
        nb_ir_non_inserm_etp: 0,
        nb_ita_others_pp: 0,
        nb_ita_others_etp: 0,
        nb_cdd_ir_pp: 0,
        nb_cdd_ir_etp: 0,
        nb_cdd_others_pp: 0,
        nb_cdd_others_etp: 0,
        nb_admin_pp: 0,
        nb_admin_etp: 0,
        active: true,
        comment: ""
      });
      const teamOne = yield teamsQueries.selectOne(team.id);
      delete teamOne.city;
      delete teamOne.cnrs_mixity;
      delete teamOne.code;
      delete teamOne.dc_email;
      delete teamOne.dc_firstname;
      delete teamOne.dc_lastname;
      delete teamOne.dc_phone;
      delete teamOne.iunop_code;
      delete teamOne.mixt_university;
      delete teamOne.nb_individual_account;
      delete teamOne.nb_structure_account;
      delete teamOne.nb_team_account;
      delete teamOne.other_mixity;
      delete teamOne.regional_delegation;
      delete teamOne.site;
      delete teamOne.structure_name;
      delete teamOne.structure_type;
      assert.deepEqual(teamOne, team);
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });

  describe("upsertOnePerCode", function() {
    it("should create a new team if none exists with the same code", function*() {
      const community = yield fixtureLoader.createCommunity({
        name: "vie",
        gate: "insb"
      });

      const section = yield fixtureLoader.createSectionCN({
        code: "",
        name: ""
      });

      const institute = yield fixtureLoader.createInstitute({
        name: "dgds",
        code: "ds99"
      });

      const rd = yield fixtureLoader.createRegionalsDelegations({
        name: "Patrick",
        code: "Sebastien"
      });

      const structure = yield fixtureLoader.createStructure({
        structure_type: "CIC",
        iunop_code: "",
        code: "biology",
        name: "BIOMAN",
        number_of_certified_team: 0,
        regional_delegation: rd.id,
        principal_it: institute.id,
        specialized_commission: section.id,
        community: community.name,
        site: "",
        street: "",
        address_supplement: "",
        postal_code: "",
        city: "",
        country: "",
        director_lastname: "",
        director_firstname: "",
        director_email: "",
        email: "",
        dc_lastname: "",
        dc_firstname: "",
        dc_phone: "",
        dc_email: "",
        mixt_university: "",
        cnrs_mixity: "",
        other_mixity: "",
        total_etp_effectiv: 0,
        nb_researchers_inserm_pp: 0,
        nb_researchers_inserm_etp: 0,
        nb_researchers_crns_pp: 0,
        nb_researchers_crns_etp: 0,
        nb_researchers_other_pp: 0,
        nb_researchers_other_etp: 0,
        nb_post_phd_student_pp: 0,
        nb_post_phd_student_etp: 0,
        nb_phd_student_pp: 0,
        nb_phd_student_etp: 0,
        nb_cdi_researchers_pp: 0,
        nb_cdi_researchers_etp: 0,
        nb_cdd_researchers_pp: 0,
        nb_cdd_researchers_etp: 0,
        nb_teacher_researchers_pp: 0,
        nb_teacher_researchers_etp: 0,
        nb_pu_ph_pp: 0,
        nb_pu_ph_etp: 0,
        nb_hosp_others_pp: 0,
        nb_hosp_others_etp: 0,
        nb_ir_inserm_pp: 0,
        // nb_individual_account: 0,
        // nb_structure_account: 0,
        // nb_team_account: 0,
        nb_ir_inserm_etp: 0,
        nb_ir_non_inserm_pp: 0,
        nb_ir_non_inserm_etp: 0,
        nb_ita_others_pp: 0,
        nb_ita_others_etp: 0,
        nb_cdd_ir_pp: 0,
        nb_cdd_ir_etp: 0,
        nb_cdd_others_pp: 0,
        nb_cdd_others_etp: 0,
        nb_admin_pp: 0,
        nb_admin_etp: 0,
        active: true,
        // secondary_it: [],
        comment: "some comment"
      });

      const teamToUpsert = yield fixtureLoader.createTeam({
        structure_code: structure.id,
        team_number: "CIC401-1",
        name: "MODULE INNOVATION TECHNOLOGIQUES",
        principal_lastname: "BORDENAVE",
        principal_firstname: "LAURENCE",
        principal_email: "Laurence.Bordenave@chu-bordeaux.fr",
        principal_it: institute.id,
        specialized_commission: section.id,
        total_etp_effectiv: 0,
        nb_researchers_inserm_pp: 0,
        nb_researchers_inserm_etp: 0,
        nb_researchers_crns_pp: 0,
        nb_researchers_crns_etp: 0,
        nb_researchers_other_pp: 0,
        nb_researchers_other_etp: 0,
        nb_post_phd_student_pp: 0,
        nb_post_phd_student_etp: 0,
        nb_phd_student_pp: 0,
        nb_phd_student_etp: 0,
        nb_cdi_researchers_pp: 0,
        nb_cdi_researchers_etp: 0,
        nb_cdd_researchers_pp: 0,
        nb_cdd_researchers_etp: 0,
        nb_teacher_researchers_pp: 0,
        nb_teacher_researchers_etp: 0,
        nb_pu_ph_pp: 0,
        nb_pu_ph_etp: 0,
        nb_hosp_others_pp: 0,
        nb_hosp_others_etp: 0,
        nb_ir_inserm_pp: 0,
        nb_ir_inserm_etp: 0,
        nb_ir_non_inserm_pp: 0,
        nb_ir_non_inserm_etp: 0,
        nb_ita_others_pp: 0,
        nb_ita_others_etp: 0,
        nb_cdd_ir_pp: 0,
        nb_cdd_ir_etp: 0,
        nb_cdd_others_pp: 0,
        nb_cdd_others_etp: 0,
        nb_admin_pp: 0,
        nb_admin_etp: 0,
        active: true,
        comment: ""
      });

      const team = yield teamsQueries.upsertOnePerTeamNumber(teamToUpsert);
      assert.deepEqual(team, {
        ...teamToUpsert,
        team_number: team.team_number
      });

      const insertedTeam = yield postgres.queryOne({
        sql: "SELECT * from teams WHERE team_number=$team_number",
        parameters: { team_number: "CIC401-1" }
      });
      assert.deepEqual(insertedTeam, team);
    });
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    it("should update existing team with the same team_number", function*() {
      const community = yield fixtureLoader.createCommunity({
        name: "vie",
        gate: "insb"
      });

      const section = yield fixtureLoader.createSectionCN({
        code: "",
        name: ""
      });

      const institute = yield fixtureLoader.createInstitute({
        name: "dgds",
        code: "ds99"
      });

      const rd = yield fixtureLoader.createRegionalsDelegations({
        name: "Patrick",
        code: "Sebastien"
      });

      const structure = yield fixtureLoader.createStructure({
        structure_type: "CIC",
        iunop_code: "",
        code: "biology",
        name: "BIOMAN",
        number_of_certified_team: 0,
        regional_delegation: rd.id,
        principal_it: institute.id,
        specialized_commission: section.id,
        community: community.name,
        site: "",
        street: "",
        address_supplement: "",
        postal_code: "",
        city: "",
        country: "",
        director_lastname: "",
        director_firstname: "",
        director_email: "",
        email: "",
        dc_lastname: "",
        dc_firstname: "",
        dc_phone: "",
        dc_email: "",
        mixt_university: "",
        cnrs_mixity: "",
        other_mixity: "",
        total_etp_effectiv: 0,
        nb_researchers_inserm_pp: 0,
        nb_researchers_inserm_etp: 0,
        nb_researchers_crns_pp: 0,
        nb_researchers_crns_etp: 0,
        nb_researchers_other_pp: 0,
        nb_researchers_other_etp: 0,
        nb_post_phd_student_pp: 0,
        nb_post_phd_student_etp: 0,
        nb_phd_student_pp: 0,
        nb_phd_student_etp: 0,
        nb_cdi_researchers_pp: 0,
        nb_cdi_researchers_etp: 0,
        nb_cdd_researchers_pp: 0,
        nb_cdd_researchers_etp: 0,
        nb_teacher_researchers_pp: 0,
        nb_teacher_researchers_etp: 0,
        nb_pu_ph_pp: 0,
        nb_pu_ph_etp: 0,
        nb_hosp_others_pp: 0,
        nb_hosp_others_etp: 0,
        nb_ir_inserm_pp: 0,
        nb_individual_account: 0,
        nb_structure_account: 0,
        nb_team_account: 0,
        nb_ir_inserm_etp: 0,
        nb_ir_non_inserm_pp: 0,
        nb_ir_non_inserm_etp: 0,
        nb_ita_others_pp: 0,
        nb_ita_others_etp: 0,
        nb_cdd_ir_pp: 0,
        nb_cdd_ir_etp: 0,
        nb_cdd_others_pp: 0,
        nb_cdd_others_etp: 0,
        nb_admin_pp: 0,
        nb_admin_etp: 0,
        active: true,
        secondary_it: [],
        comment: "a comment."
      });

      const teamToUpsert = {
        structure_code: structure.id,
        team_number: "CIC401-1",
        name: "MODULE INNOVATION TECHNOLOGIQUES",
        principal_lastname: "BORDENAVE",
        principal_firstname: "LAURENCE",
        principal_email: "Laurence.Bordenave@chu-bordeaux.fr",
        principal_it: institute.id,
        specialized_commission: section.id,
        total_etp_effectiv: 0,
        nb_researchers_inserm_pp: 0,
        nb_researchers_inserm_etp: 0,
        nb_researchers_crns_pp: 0,
        nb_researchers_crns_etp: 0,
        nb_researchers_other_pp: 0,
        nb_researchers_other_etp: 0,
        nb_post_phd_student_pp: 0,
        nb_post_phd_student_etp: 0,
        nb_phd_student_pp: 0,
        nb_phd_student_etp: 0,
        nb_cdi_researchers_pp: 0,
        nb_cdi_researchers_etp: 0,
        nb_cdd_researchers_pp: 0,
        nb_cdd_researchers_etp: 0,
        nb_teacher_researchers_pp: 0,
        nb_teacher_researchers_etp: 0,
        nb_pu_ph_pp: 0,
        nb_pu_ph_etp: 0,
        nb_hosp_others_pp: 0,
        nb_hosp_others_etp: 0,
        nb_ir_inserm_pp: 0,
        nb_ir_inserm_etp: 0,
        nb_ir_non_inserm_pp: 0,
        nb_ir_non_inserm_etp: 0,
        nb_ita_others_pp: 0,
        nb_ita_others_etp: 0,
        nb_cdd_ir_pp: 0,
        nb_cdd_ir_etp: 0,
        nb_cdd_others_pp: 0,
        nb_cdd_others_etp: 0,
        nb_admin_pp: 0,
        nb_admin_etp: 0,
        active: true,
        comment: "Wow that's an incredible comment !"
      };

      const previousTeam = yield fixtureLoader.createTeam({
        structure_code: structure.id,
        team_number: "CIC401-1",
        name: "MODULE INNOVATION TECHNOLOGIQUES",
        principal_lastname: "BORDENAVE",
        principal_firstname: "LAURENCE",
        principal_email: "Laurence.Bordenave@chu-bordeaux.fr",
        principal_it: institute.id,
        specialized_commission: section.id,
        total_etp_effectiv: 0,
        nb_researchers_inserm_pp: 0,
        nb_researchers_inserm_etp: 0,
        nb_researchers_crns_pp: 0,
        nb_researchers_crns_etp: 0,
        nb_researchers_other_pp: 0,
        nb_researchers_other_etp: 0,
        nb_post_phd_student_pp: 0,
        nb_post_phd_student_etp: 0,
        nb_phd_student_pp: 0,
        nb_phd_student_etp: 0,
        nb_cdi_researchers_pp: 0,
        nb_cdi_researchers_etp: 0,
        nb_cdd_researchers_pp: 0,
        nb_cdd_researchers_etp: 0,
        nb_teacher_researchers_pp: 0,
        nb_teacher_researchers_etp: 0,
        nb_pu_ph_pp: 0,
        nb_pu_ph_etp: 0,
        nb_hosp_others_pp: 0,
        nb_hosp_others_etp: 0,
        nb_ir_inserm_pp: 0,
        nb_ir_inserm_etp: 0,
        nb_ir_non_inserm_pp: 0,
        nb_ir_non_inserm_etp: 0,
        nb_ita_others_pp: 0,
        nb_ita_others_etp: 0,
        nb_cdd_ir_pp: 0,
        nb_cdd_ir_etp: 0,
        nb_cdd_others_pp: 0,
        nb_cdd_others_etp: 0,
        nb_admin_pp: 0,
        nb_admin_etp: 0,
        active: true,
        comment: ""
      });

      const team = yield teamsQueries.upsertOnePerTeamNumber(teamToUpsert);
      assert.deepEqual(team, {
        ...teamToUpsert,
        id: team.id
      });
      const updatedTeam = yield postgres.queryOne({
        sql: "SELECT * from teams WHERE team_number=$team_number",
        parameters: { team_number: previousTeam.team_number }
      });
      assert.deepEqual(updatedTeam, team);
      assert.notDeepEqual(updatedTeam, previousTeam);
    });

    afterEach(function*() {
      yield fixtureLoader.clear();
    });
  });
});
