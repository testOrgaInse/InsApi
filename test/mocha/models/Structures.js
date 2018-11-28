import Structure from "../../../lib/models/Structures";
import Community from "../../../lib/models/Community";

describe("model Structure", function() {
  let structureQueries, communityQueries;
  before(function() {
    structureQueries = Structure(postgres);
    communityQueries = Community(postgres);
  });

  describe("selectOne", function() {
    it("should return one structure by id", function*() {
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
        comment: "A comment."
      });

      assert.deepEqual(yield structureQueries.selectOne(structure.id), {
        id: structure.id,
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
        nb_individual_account: 0,
        nb_structure_account: 0,
        nb_team_account: 0,
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
        secondary_it: [],
        comment: "A comment."
      });
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });

  describe("selectPage", function() {
    let biology,
      chemestry,
      humanity,
      inserm,
      inshs,
      insb,
      insu,
      in2p3,
      rd,
      section,
      team_biology,
      team_chemestry,
      team_humanity;
    before(function*() {
      inserm = yield fixtureLoader.createCommunity({
        name: "INSERM",
        gate: "insb"
      });

      section = yield fixtureLoader.createSectionCN({
        code: "John",
        name: "Wick"
      });

      [inshs, insb, insu, in2p3] = yield [
        fixtureLoader.createInstitute({ name: "inshs", code: "DS54" }),
        fixtureLoader.createInstitute({ name: "insb", code: "DS56" }),
        fixtureLoader.createInstitute({ name: "insu", code: "DS55" }),
        fixtureLoader.createInstitute({ name: "in2p3", code: "DS57" })
      ];

      rd = yield fixtureLoader.createRegionalsDelegations({
        name: "Patrick",
        code: "Sebastien"
      });

      chemestry = yield fixtureLoader.createStructure({
        structure_type: "CIC",
        iunop_code: "",
        regional_delegation: rd.id,
        name: "CHEMAN",
        code: "chemestry",
        community: inserm.name,
        principal_it: insb.id,
        secondary_it: [inshs.id],
        specialized_commission: section.id,
        number_of_certified_team: 0,
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
        nb_team_account: 0,
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
        comment: "A comment."
      });
      biology = yield fixtureLoader.createStructure({
        structure_type: "CIC",
        iunop_code: "",
        name: "BIOMAN",
        code: "biology",
        regional_delegation: rd.id,
        community: inserm.name,
        principal_it: insb.id,
        specialized_commission: section.id,
        number_of_certified_team: 0,
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
        nb_team_account: 0,
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
        secondary_it: [],
        comment: "A comment."
      });
      humanity = yield fixtureLoader.createStructure({
        structure_type: "CIC",
        iunop_code: "",
        name: "HUMAN",
        code: "humanity",
        regional_delegation: rd.id,
        community: inserm.name,
        principal_it: inshs.id,
        secondary_it: [insu.id, in2p3.id],
        specialized_commission: section.id,
        number_of_certified_team: 0,
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
        nb_team_account: 0,
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
        comment: "A comment."
      });

      team_chemestry = yield fixtureLoader.createTeam({
        structure_code: chemestry.id,
        team_number: "CIC401-1",
        name: "CHEMBOYS",
        principal_it: insb.id,
        specialized_commission: section.id
      });

      team_biology = yield fixtureLoader.createTeam({
        structure_code: biology.id,
        team_number: "CIC401-2",
        name: "BIOBOYS",
        principal_it: insb.id,
        specialized_commission: section.id
      });

      team_humanity = yield fixtureLoader.createTeam({
        structure_code: humanity.id,
        team_number: "CIC401-3",
        name: "HUMANBOYS",
        principal_it: inshs.id,
        specialized_commission: section.id
      });

      yield [
        fixtureLoader.createStructureTeamAccount({
          login: "1",
          password: "123mdp",
          structure_code: chemestry.id,
          team_number: team_chemestry.id
        }),
        fixtureLoader.createStructureTeamAccount({
          login: "2",
          password: "123mdp",
          structure_code: chemestry.id,
          team_number: team_chemestry.id
        }),
        fixtureLoader.createStructureTeamAccount({
          login: "3",
          password: "123mdp",
          structure_code: biology.id,
          team_number: team_biology.id
        }),
        fixtureLoader.createStructureTeamAccount({
          login: "4",
          password: "123mdp",
          structure_code: humanity.id,
          team_number: team_humanity.id
        })
      ];

      console.log("createIndividualAccount");
      yield [
        fixtureLoader.createIndividualAccount({
          uid: "1",
          firstname: "Jean-Marie",
          lastname: "Lepen",
          structure_code: chemestry.id,
          community: inserm.name,
          team_number: team_chemestry.id,
          regional_delegation: rd.id,
          specialized_commission: section.id
        }),
        fixtureLoader.createIndividualAccount({
          uid: "2",
          firstname: "Jacques",
          lastname: "Chirac",
          structure_code: biology.id,
          community: inserm.name,
          team_number: team_biology.id,
          regional_delegation: rd.id,
          specialized_commission: section.id
        }),
        fixtureLoader.createIndividualAccount({
          uid: "3",
          firstname: "Francois",
          lastname: "Hollande",
          structure_code: biology.id,
          community: inserm.name,
          team_number: team_biology.id,
          regional_delegation: rd.id,
          specialized_commission: section.id
        }),
        fixtureLoader.createIndividualAccount({
          uid: "4",
          firstname: "Nicolas",
          lastname: "Sarkozy",
          structure_code: humanity.id,
          community: inserm.name,
          team_number: team_humanity.id,
          regional_delegation: rd.id,
          specialized_commission: section.id
        })
      ];
    });

    it("should return one structure by id", function*() {
      assert.deepEqual(yield structureQueries.selectPage(), [
        {
          id: chemestry.id,
          iunop_code: "",
          structure_type: "CIC",
          regional_delegation: rd.id,
          name: "CHEMAN",
          code: "chemestry",
          community: inserm.name,
          principal_it: insb.id,
          specialized_commission: section.id,
          number_of_certified_team: 0,
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
          nb_individual_account: 1,
          nb_structure_account: 0,
          nb_team_account: 0,
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
          comment: "A comment.",
          totalcount: "3"
        },
        {
          id: biology.id,
          iunop_code: "",
          structure_type: "CIC",
          name: "BIOMAN",
          code: "biology",
          regional_delegation: rd.id,
          community: inserm.name,
          principal_it: insb.id,
          specialized_commission: section.id,
          number_of_certified_team: 0,
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
          nb_individual_account: 2,
          nb_structure_account: 0,
          nb_team_account: 0,
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
          comment: "A comment.",
          totalcount: "3"
        },
        {
          id: humanity.id,
          iunop_code: "",
          structure_type: "CIC",
          name: "HUMAN",
          code: "humanity",
          regional_delegation: rd.id,
          community: inserm.name,
          principal_it: inshs.id,
          specialized_commission: section.id,
          number_of_certified_team: 0,
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
          nb_individual_account: 1,
          nb_structure_account: 0,
          nb_team_account: 0,
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
          comment: "A comment.",
          totalcount: "3"
        }
      ]);
    });

    after(function*() {
      yield fixtureLoader.clear();
    });
  });

  describe("upsertOnePerCode", function() {
    it("should create a new structure if none exists with the same code", function*() {
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

      const structureToUpsert = {
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
      };

      const structure = yield structureQueries.upsertOnePerCode(
        structureToUpsert
      );
      assert.deepEqual(structure, {
        ...structureToUpsert,
        id: structure.id
      });

      const insertedStructure = yield postgres.queryOne({
        sql: "SELECT * from structures WHERE code=$code",
        parameters: { code: "biology" }
      });
      assert.deepEqual(insertedStructure, structure);
    });

    it("should update existing structure with the same code", function*() {
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

      const structureToUpsert = {
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
        comment: "A DAMN NEW comment."
      };
      const previousStructure = yield fixtureLoader.createStructure({
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
        comment: "some comment"
      });
      const structure = yield structureQueries.upsertOnePerCode(
        structureToUpsert
      );
      assert.deepEqual(structure, {
        ...structureToUpsert,
        id: structure.id
      });
      const updatedStructure = yield postgres.queryOne({
        sql: "SELECT * from structures WHERE id=$id",
        parameters: { id: previousStructure.id }
      });
      assert.deepEqual(updatedStructure, structure);
      assert.notDeepEqual(updatedStructure, previousStructure);
    });

    afterEach(function*() {
      yield fixtureLoader.clear();
    });
  });
});
//   describe("selectByIds", function() {
//     let cern, inist;

//     before(function*() {
//       [cern, inist] = yield ["cern", "inist", "marmelab"].map(code =>
//         fixtureLoader.createUnit({ code })
//       );
//     });

//     it("should return each institute with given ids", function*() {
//       assert.deepEqual(yield unitQueries.selectByIds([cern.id, inist.id]), [
//         {
//           id: cern.id,
//           code: cern.code,
//           name: null
//         },
//         {
//           id: inist.id,
//           code: inist.code,
//           name: null
//         }
//       ]);
//     });

//     it("should throw an error if trying to retrieve an unit that does not exists", function*() {
//       let error;

//       try {
//         yield unitQueries.selectByIds([cern.id, inist.id, 0]);
//       } catch (e) {
//         error = e;
//       }
//       assert.equal(error.message, "Units 0 does not exists");
//     });

//     after(function*() {
//       yield fixtureLoader.clear();
//     });
//   });

//   describe("selectByJanusAccountIdQuery", function() {
//     it("should return additional_units of user", function*() {
//       const [cern, inist, marmelab] = yield ["cern", "inist", "marmelab"].map(
//         code => fixtureLoader.createUnit({ code })
//       );

//       const john = yield fixtureLoader.createJanusAccount({
//         uid: "john",
//         additional_units: [cern.id, inist.id]
//       });
//       const jane = yield fixtureLoader.createJanusAccount({
//         uid: "jane",
//         additional_units: [inist.id, marmelab.id]
//       });
//       assert.deepEqual(yield unitQueries.selectByJanusAccountId(john.id), [
//         {
//           id: cern.id,
//           code: cern.code,
//           totalcount: "2",
//           index: 0,
//           janus_account_id: john.id
//         },
//         {
//           id: inist.id,
//           code: inist.code,
//           totalcount: "2",
//           index: 1,
//           janus_account_id: john.id
//         }
//       ]);
//       assert.deepEqual(yield unitQueries.selectByJanusAccountId(jane.id), [
//         {
//           id: inist.id,
//           code: inist.code,
//           totalcount: "2",
//           index: 0,
//           janus_account_id: jane.id
//         },
//         {
//           id: marmelab.id,
//           code: marmelab.code,
//           totalcount: "2",
//           index: 1,
//           janus_account_id: jane.id
//         }
//       ]);
//     });

//     afterEach(function*() {
//       yield fixtureLoader.clear();
//     });
//   });

//   describe("selectByInistAccountIdQuery", function() {
//     it("should return additional_units of user", function*() {
//       const [cern, inist, marmelab] = yield ["cern", "inist", "marmelab"].map(
//         code => fixtureLoader.createUnit({ code })
//       );
//       const john = yield fixtureLoader.createInistAccount({
//         username: "john",
//         units: [cern.id, inist.id]
//       });

//       const jane = yield fixtureLoader.createInistAccount({
//         username: "jane",
//         units: [inist.id, marmelab.id]
//       });
//       assert.deepEqual(yield unitQueries.selectByInistAccountId(john.id), [
//         {
//           id: cern.id,
//           code: cern.code,
//           totalcount: "2",
//           index: 0,
//           inist_account_id: john.id
//         },
//         {
//           id: inist.id,
//           code: inist.code,
//           totalcount: "2",
//           index: 1,
//           inist_account_id: john.id
//         }
//       ]);
//       assert.deepEqual(yield unitQueries.selectByInistAccountId(jane.id), [
//         {
//           id: inist.id,
//           code: inist.code,
//           totalcount: "2",
//           index: 0,
//           inist_account_id: jane.id
//         },
//         {
//           id: marmelab.id,
//           code: marmelab.code,
//           totalcount: "2",
//           index: 1,
//           inist_account_id: jane.id
//         }
//       ]);
//     });

//     afterEach(function*() {
//       yield fixtureLoader.clear();
//     });
//   });
