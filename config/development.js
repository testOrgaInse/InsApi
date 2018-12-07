module.exports = {
  auth: {
    headerSecret: "secret1",
    cookieSecret: "secret2",
    adminSecret: "secret3",
    expiresIn: 36000
  },
  EzProxy: {
    ticketSecret: "ez-proxy-secret"
  },
  fakeLogin: true,
  mailServer: {
    host: process.env.MAILDEV_1_PORT_25_TCP_ADDR,
    port: process.env.MAILDEV_1_PORT_25_TCP_PORT
  },
  insadmin_host: "http://localhost:3011/public"
};
