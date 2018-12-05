import co from "co";
import ebscoToken from "../../../lib/services/ebscoToken";

const noop = () => Promise.resolve();

describe("ebscoToken", function() {
  let configuredEbscoToken;
  const user = {
    username: "john",
    domains: ["INSB", "INSHS", "INC"]
  };
  let hmgetAsyncCall;
  let hsetAsyncCall;
  let expireAsyncCall;
  let ebscoSessionCall;
  let ebscoAuthenticationCall;
  let hdelAsyncCall;
  let delAsyncCall;

  before(function() {
    const ebscoSession = function*(profile, token) {
      yield noop();
      ebscoSessionCall.push({ profile, token });

      return { SessionToken: "ebscoSessionToken" };
    };

    const ebscoAuthentication = function*(userId, password) {
      yield noop();
      ebscoAuthenticationCall.push({ userId, password });

      return {
        AuthToken: "ebscoAuthToken",
        AuthTimeout: 1800
      };
    };
    configuredEbscoToken = ebscoToken(
      user.username,
      user.domains,
      ebscoSession,
      ebscoAuthentication
    );
  });

  beforeEach(function() {
    configuredEbscoToken.username(user.username);
    hmgetAsyncCall = [];
    hsetAsyncCall = [];
    expireAsyncCall = [];
    ebscoSessionCall = [];
    ebscoAuthenticationCall = [];
    hdelAsyncCall = [];
    delAsyncCall = [];
  });

  describe(".get", function() {
    it("should throw an error if target domain is not in user.domains", function*() {
      const error = yield co(
        configuredEbscoToken.get("IN2P3", "user_id", "password", "profile")
      ).catch(e => e);

      const expectedError = new Error(
        "You are not authorized to access domain IN2P3"
      );
      expectedError.status = 401;
      assert.deepEqual(error, expectedError);
    });

    it("should be configurable", function*() {
      configuredEbscoToken.username("another");
      const result = yield configuredEbscoToken.get(
        "INC",
        "user_id",
        "password",
        "profile"
      );
      assert.deepEqual(result, {
        authToken: "ebscoAuthToken",
        sessionToken: "ebscoSessionToken"
      });
      assert.deepEqual(hmgetAsyncCall, [
        { name: "INC", key1: "authToken", key2: "another" }
      ]);
      assert.deepEqual(ebscoAuthenticationCall, [
        { userId: "user_id", password: "password" }
      ]);
      assert.deepEqual(ebscoSessionCall, [
        { profile: "profile", token: "ebscoAuthToken" }
      ]);
      assert.deepEqual(hsetAsyncCall, [
        { name: "INC", key: "authToken", value: "ebscoAuthToken" },
        { name: "INC", key: "another", value: "ebscoSessionToken" }
      ]);
      assert.deepEqual(expireAsyncCall, [{ name: "INC", ttl: 1795 }]);
    });
  });

  describe("invalidateSession", function() {
    it("should call hdelAsync with domainName", function*() {
      yield configuredEbscoToken.invalidateSession("INC");
      assert.deepEqual(hdelAsyncCall, [{ key: "INC", subKey: user.username }]);
    });

    it("should be configurable", function*() {
      configuredEbscoToken.username("another");
      yield configuredEbscoToken.invalidateSession("INC");
      assert.deepEqual(hdelAsyncCall, [{ key: "INC", subKey: "another" }]);
    });
  });

  describe("invalidateAuth", function() {
    it("should call delAsync with domainName", function*() {
      yield configuredEbscoToken.invalidateAuth("INC");
      assert.deepEqual(delAsyncCall, [{ key: "INC" }]);
    });

    it("should be configurable", function*() {
      configuredEbscoToken.username("another");
      yield configuredEbscoToken.invalidateAuth("INC");
      assert.deepEqual(delAsyncCall, [{ key: "INC" }]);
    });
  });
});
