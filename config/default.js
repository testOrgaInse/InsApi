module.exports = {
  alertTimeout: 1000 * 3600 * 3, // 3 hours
  port: 3000,
  host: "localhost",
  auth: {
    cookieSecret: process.env.cookie_secret,
    headerSecret: process.env.header_secret,
    adminSecret: process.env.admin_secret,
    expiresIn: 10 * 3600 // 10 hours
  },
  EzProxy: {
    ticketSecret: process.env.ticket_secret
  },
  postgres: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: 5432
  },
  fakeLogin: false,
  logs: true,
  maxSearchHistoryAgeInMonths: 2,
  mailServer: {
    host: process.env.MAIL_SERVER_HOST,
    port: process.env.MAIL_SERVER_PORT,
    from: "biblioinserm@inserm.fr",
    to: "biblioinserm@inserm.fr"
  }
};
