import jwt from "koa-jwt";
import { auth } from "config";

describe("POST /ebsco/getLogin", function() {
  it("should return favourite_resources from account", function*() {
    const [insb, inshs] = yield ["insb", "inshs"].map(name =>
      fixtureLoader.createCommunity({
        name,
        gate: name
      })
    );

    const account = yield fixtureLoader.createJanusAccount({
      uid: "john",
      communities: [insb.id, inshs.id],
      favourite_resources: `[{ "title": "my resource", "url": "www.myresource.com" }]`
    });

    yield fixtureLoader.createRevue({
      title: "insb",
      url: "www.insb.fr",
      communities: [insb.id]
    });
    yield fixtureLoader.createRevue({
      title: "inshs",
      url: "www.inshs.fr",
      communities: [inshs.id]
    });

    const cookieToken = jwt.sign(
      {
        domains: ["insb", "inshs"],
        groups: ["insb", "inshs"],
        shib: "shibboleth_session_cookie",
        username: "john",
        id: account.id
      },
      auth.cookieSecret
    );

    const response = yield request.post(
      "/ebsco/getLogin",
      null,
      null,
      cookieToken
    );

    assert.deepEqual(JSON.parse(response.body), {
      domains: ["insb", "inshs"],
      favouriteResources: [{ title: "my resource", url: "www.myresource.com" }],
      origin: "inist",
      token: "header_token",
      username: "john",
      id: account.id
    });
  });

  it("should return favourite_resources from revues if account has none", function*() {
    const [insb, inshs] = yield ["insb", "inshs"].map(name =>
      fixtureLoader.createCommunity({
        name,
        gate: name
      })
    );

    const account = yield fixtureLoader.createJanusAccount({
      uid: "john",
      communities: [insb.id, inshs.id]
    });

    yield fixtureLoader.createRevue({
      title: "insb",
      url: "www.insb.fr",
      communities: [insb.id]
    });
    yield fixtureLoader.createRevue({
      title: "inshs",
      url: "www.inshs.fr",
      communities: [inshs.id]
    });

    const cookieToken = jwt.sign(
      {
        domains: ["insb", "inshs"],
        groups: ["insb", "inshs"],
        shib: "shibboleth_session_cookie",
        username: "john",
        id: account.id
      },
      auth.cookieSecret
    );

    const response = yield request.post(
      "/ebsco/getLogin",
      null,
      null,
      cookieToken
    );

    assert.deepEqual(JSON.parse(response.body), {
      domains: ["insb", "inshs"],
      favouriteResources: [
        {
          title: "insb",
          url: "http://insb.bib.cnrs.fr/login?url=www.insb.fr"
        },
        {
          title: "inshs",
          url: "http://inshs.bib.cnrs.fr/login?url=www.inshs.fr"
        }
      ],
      origin: "inist",
      token: "header_token",
      username: "john",
      id: account.id
    });
  });

  afterEach(function*() {
    request.setToken();
    yield fixtureLoader.clear();
  });
});
