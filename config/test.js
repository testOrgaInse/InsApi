module.exports = {
  port: 3001,
  host: "localhost",
  auth: {
    headerSecret: "changeme",
    cookieSecret: "changemetoo",
    adminSecret: "changeme",
    expiresIn: 10 * 3600 // 10 hours
  },
  EzProxy: {
    ticketSecret: "secret"
  },
  logs: false,
  mailServer: {
    host: "maildev-test",
    port: 25
  },
  insadmin_host: "https://insadmin_url"
};
