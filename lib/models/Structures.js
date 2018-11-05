import structuresQueries from "../queries/structuresQueries";

function Structures(client) {
  const structuresClient = client.link(Structures.queries);

  return {
    ...structuresClient
  };
}

Structures.queries = structuresQueries;

export default Structures;
