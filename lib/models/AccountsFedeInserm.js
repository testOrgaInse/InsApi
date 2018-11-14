import accountsFedeInsermQueries from "../queries/accountsFedeInsermQueries";

function AccountsFedeInserm(client) {
  const accountsFedeInsermClient = client.link(AccountsFedeInserm.queries);

  return {
    ...accountsFedeInsermClient
  };
}

AccountsFedeInserm.queries = accountsFedeInsermQueries;

export default AccountsFedeInserm;
