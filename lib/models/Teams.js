import teamsQueries from "../queries/teamsQueries";

function Teams(client) {
  const teamsClient = client.link(Teams.queries);

  const insertOne = function* insertOne(teams) {
    try {
      yield client.begin();
      yield teamsClient.insertOne(teams);

      yield client.commit();

      return {
        ...teams
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const updateOne = function*(selector, sectionCN) {
    try {
      yield client.begin();

      let updatedTeams;
      try {
        updatedTeams = yield teamsClient.updateOne(selector, sectionCN);
      } catch (error) {
        if (error.message !== "no valid column to set") {
          throw error;
        }
        updatedTeams = yield teamsClient.selectOne({
          id: selector
        });
      }

      yield client.commit();

      return {
        ...updatedTeams
      };
    } catch (error) {
      yield client.rollback();
      throw error;
    }
  };

  const selectOne = function*(selector) {
    const data = yield client.query({
      sql:
        "SELECT * FROM teams INNER JOIN structures ON teams.structure_code = structures.id WHERE teams.id = $selector",
      parameters: {
        selector
      }
    });
    return data[0];
  };

  return {
    ...teamsClient,
    insertOne,
    updateOne,
    selectOne
  };
}

Teams.queries = teamsQueries;

export default Teams;
