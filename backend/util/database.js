import settings from "./settings.js";
import chalk from "chalk";
import { Sequelize } from "sequelize";
import migration from "./migration.js";

const sequelize = new Sequelize(settings.database.dbConnectionUri, {
  logging: settings.database.logging,
  define: { timestamps: false },
});

sequelize
  .authenticate()
  .catch((err) => {
    sequelize["database_error"] = "DB_CONNECTION_FAILED";
    console.log(chalk.bold.red("Database connection failed:"), chalk.red(err));
  })
  .then(() => migration(sequelize))
  .catch((err) => {
    sequelize["database_error"] = "MIGRATION_FAILED";
    console.log(chalk.bold.red("Migration failed:"), chalk.red(err));
  });

export default sequelize;
