import fedeInsermAccountsQueries from "../queries/fedeInsermAccountsQueries";

function FedeInsermAccounts(client) {
  const fedeInsermAccountsClient = client.link(FedeInsermAccounts.queries);

  const getSimilarUid = function* getSimilarUid(uid) {
    if (yield fedeInsermAccountsClient.selectOneByUid(uid)) {
      return []; // not a new user so no check
    }

    const [, id] = uid.match(/^(.*?)\.[0-9]+$/) || [null, uid];

    return yield fedeInsermAccountsClient.selectBySimilarUid(id);
  };

  const selectEzTicketInfoForId = function* selectEzTicketInfoForId(...args) {
    const [user] = yield fedeInsermAccountsClient.selectEzTicketInfoForId(
      ...args
    );

    return {
      username: `${user.email}_O_INSERM_I_${user.structure_code ||
        "UNKNOWN"}_OU_${user.itmo_principal || "UNKNOWN"}`,
      domains: user.community,
      groups: [user.community]
    };
  };

  return {
    ...fedeInsermAccountsClient,
    getSimilarUid,
    selectEzTicketInfoForId
  };
}

FedeInsermAccounts.queries = fedeInsermAccountsQueries;

export default FedeInsermAccounts;
