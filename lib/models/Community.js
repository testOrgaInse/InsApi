import communityQueries from "../queries/communityQueries";

function Community(client) {
  const communityClient = client.link(Community.queries);

  return {
    ...communityClient
  };
}

Community.queries = communityQueries;

export default Community;
