import fedeInsermAccountsQueries from "../queries/fedeInsermAccountsQueries";

function FedeInsermAccounts(client) {
  const fedeInsermAccountsClient = client.link(FedeInsermAccounts.queries);

  const selectEzTicketInfoForId = function* selectEzTicketInfoForId(...args) {
    const [user] = yield fedeInsermAccountsClient.selectEzTicketInfoForId(
      ...args
    );

    // additional information
    const [query] = yield client.query({
      sql: `SELECT individual_account_fede.email, structures.code AS structure_code, teams.team_number, institute.code AS it_principal, regionals_delegations.code AS dr_code, section_cn.code AS section_cn_code
      FROM individual_account_fede 
      LEFT JOIN structures ON individual_account_fede.structure_code = structures.id 
      LEFT JOIN teams ON individual_account_fede.team_number = teams.id
      LEFT JOIN institute ON individual_account_fede.itmo_principal = institute.id
      LEFT JOIN regionals_delegations ON individual_account_fede.regional_delegation = regionals_delegations.id
      LEFT JOIN section_cn ON individual_account_fede.specialized_commission = section_cn.id
      WHERE individual_account_fede.id = $id`,
      parameters: { id: user.id }
    });

    return {
      username: `${user.login}_O_INSERM_OU_${query.structure_code ||
        "UNKNOWN"}_OE_${query.team_number ||
        "UNKNOWN"}_I_${query.it_principal || "UNKNOWN"}_DR_${query.dr_code ||
        "UNKNOWN"}_CS_${query.section_cn_code || "UNKNOWN"}`,
      domains: user.community,
      groups: [user.community]
    };
  };

  return {
    ...fedeInsermAccountsClient,
    selectEzTicketInfoForId
  };
}

FedeInsermAccounts.queries = fedeInsermAccountsQueries;

export default FedeInsermAccounts;
