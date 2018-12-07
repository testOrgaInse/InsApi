import fedeInsermAccountsQueries from "../queries/fedeInsermAccountsQueries";

function FedeInsermAccounts(client) {
  const fedeInsermAccountsClient = client.link(FedeInsermAccounts.queries);

  const selectEzTicketInfoForId = function* selectEzTicketInfoForId(...args) {
    const [user] = yield fedeInsermAccountsClient.selectEzTicketInfoForId(
      ...args
    );

    return {
      username: `${user.inserm_email}_O_INSERM_I_UNKNOWN_OU_UNKNOWN`,
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
