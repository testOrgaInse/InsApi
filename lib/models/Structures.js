import structuresQueries from "../queries/structuresQueries";

function Structures(client) {
  const structuresClient = client.link(Structures.queries);

  const selectOne = function*(selector) {
    const structure = yield structuresClient.selectOne(selector);
    const secondary_it = yield client.query({
      sql: `SELECT * FROM secondary_it_structures 
        WHERE structure_id = $id`,
      parameters: {
        id: structure.id
      }
    });
    structure.secondary_it = secondary_it.map(n => n.institute_id);
    console.log(structure);
    return structure;
  };

  const insertOne = function*(data) {
    const structure = yield structuresClient.insertOne(data);
    console.log(structure.id);
    console.log("==========");
    console.log("==========");
    if (data.secondary_it.length > 0) {
      data.secondary_it.forEach(async institute_id => {
        console.log(institute_id);
        await client.query({
          sql: `INSERT INTO secondary_it_structures (structure_id, institute_id) 
          VALUES($structure_id, $institute_id)`,
          parameters: {
            structure_id: structure.id,
            institute_id
          }
        });
      });
    }
  };

  return {
    ...structuresClient,
    selectOne,
    insertOne
  };
}

Structures.queries = structuresQueries;

export default Structures;
