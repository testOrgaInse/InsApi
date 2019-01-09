import structuresQueries from "../queries/structuresQueries";

function Structures(client) {
  const structuresClient = client.link(Structures.queries);

  const selectPage = function*(...args) {
    const { _perPage, _page } = args[5];
    const ListStructure = yield structuresClient.selectPage(
      _perPage,
      _page - 1
    );
    const listIt = yield client.query({
      sql: `SELECT * FROM secondary_it_structures`,
      parameters: {}
    });
    ListStructure.forEach(element => {
      element.secondary_it = [];
      listIt.forEach(n => {
        if (n.structure_id === element.id) {
          element.secondary_it.push(n.institute_id);
        }
      });
    });
    return ListStructure;
  };

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
    return structure;
  };

  const insertOne = function*(data) {
    const structure = yield structuresClient.insertOne(data);
    if (data.secondary_it && data.secondary_it.length > 0) {
      data.secondary_it.forEach(async institute_id => {
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
    return structure;
  };

  const updateOne = function*(selector, data) {
    const structure = yield structuresClient.updateOne(selector, data);
    if (data.secondary_it && data.secondary_it.length > 0) {
      yield client.query({
        sql: `DELETE FROM secondary_it_structures WHERE structure_id = $structure_id`,
        parameters: {
          structure_id: structure.id
        }
      });
      data.secondary_it.forEach(async institute_id => {
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
    return structure;
  };

  return {
    ...structuresClient,
    selectOne,
    insertOne,
    updateOne,
    selectPage
  };
}

Structures.queries = structuresQueries;

export default Structures;
