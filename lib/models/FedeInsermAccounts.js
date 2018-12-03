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

  return {
    ...fedeInsermAccountsClient,
    getSimilarUid
  };
}

FedeInsermAccounts.queries = fedeInsermAccountsQueries;

export default FedeInsermAccounts;
