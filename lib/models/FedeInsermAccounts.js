import fedeInsermAccountsQueries from "../queries/fedeInsermAccountsQueries";

function FedeInsermAccounts(client) {
  const fedeInsermAccountsClient = client.link(FedeInsermAccounts.queries);

  return {
    ...fedeInsermAccountsClient
  };
}

FedeInsermAccounts.queries = fedeInsermAccountsQueries;

export default FedeInsermAccounts;
