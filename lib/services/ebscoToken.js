import configurable from "../utils/configurable";

export default function(username, domains, ebscoSession, ebscoAuthentication) {
  const config = {
    username,
    domains,
    ebscoSession,
    ebscoAuthentication
  };

  const get = function* get(domainName, userId, password, profile) {
    const { username, domains, ebscoSession, ebscoAuthentication } = config;

    if (domains.indexOf(domainName) === -1) {
      let error = new Error(
        `You are not authorized to access domain ${domainName}`
      );
      error.status = 401;
      throw error;
    }

    if (!authToken) {
      const { AuthToken, AuthTimeout } = yield ebscoAuthentication(
        userId,
        password
      );
      authToken = AuthToken;
    }

    const { SessionToken } = yield ebscoSession(profile, authToken);
    sessionToken = SessionToken;

    return {
      authToken,
      sessionToken
    };
  };

  return configurable(
    {
      get
    },
    config
  );
}
