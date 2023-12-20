const settings = {
  database: {
    dbConnectionUri: process.env.DB_CONNECTION_URI || "sqlite://local-db.sqlite3",
    logging: Boolean(process.env.DB_LOGGING || false),
  },
  migration: {
    directory: process.env["MIGRATION_DIR"] || "./migrations",
    migrate: !process.env["MIGRATION_OFF"],
  },
  jwt: {
    secret: process.env.JWT_SECRET || "hGs7FkJctYeGHQ",
    algorithms: ["HS256"],
    expiresIn: process.env.JWT_EXPIRES_IN || 24 * 3600,
  },
  constants: {
    web: {
      port: process.env.PORT || 3000,
      logFormat: process.env.LOG_FORMAT || "dev",
    },
  },
};

export default settings;
