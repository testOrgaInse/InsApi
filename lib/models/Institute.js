import instituteQueries from "../queries/instituteQueries";

function Institute(client) {
  const instituteClient = client.link(Institute.queries);

  const insertOne = function* insertOne(institute) {
    return instituteClient.insertOne(institute);
  };

  function* insertInstituteIfNotExists(code, name) {
    if (!code) {
      return null;
    }
    let institute = yield instituteClient.selectOneByCode(code);
    if (institute) {
      return institute;
    }

    return yield insertOne({ code, name });
  }

  return {
    ...instituteClient,
    insertInstituteIfNotExists
  };
}

Institute.queries = instituteQueries;

export default Institute;
