import sectionCNQueries from "../queries/sectionCNQueries";

function SectionCN(client) {
  const sectionCNClient = client.link(SectionCN.queries);

  return {
    ...sectionCNClient
  };
}

SectionCN.queries = sectionCNQueries;

export default SectionCN;
