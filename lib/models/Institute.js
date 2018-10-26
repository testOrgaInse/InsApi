import instituteQueries from "../queries/instituteQueries";

function Institute(client) {
  const instituteClient = client.link(Institute.queries);

  return {
    ...instituteClient
  };
}

Institute.queries = instituteQueries;

export default Institute;
