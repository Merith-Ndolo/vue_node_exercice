import chalk from "chalk";
import settings from "./settings.js";
import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize } from "sequelize";

async function migrate(sequelize) {
  const umzug = new Umzug({
    migrations: {
      glob: "migrations/*.js",
      resolve: ({ name, path, context }) => {
        return {
          name,
          up: async () => (await import("file://" + path)).default.up(context, Sequelize),
          down: async () => (await import("file://" + path)).default.down(context, Sequelize),
        };
      },
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
  await umzug.up();
}

async function migrationHelper(sequelize) {
  if (settings.migration.migrate) {
    await migrate(sequelize);
  } else {
    console.log(chalk.yellow("⚠  MIGRATION execution is toggled off"));
  }
}

export default migrationHelper;
