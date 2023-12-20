export default {
  up: async (q) => {
    await q.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `Events` (`id` CHAR(36) NOT NULL , `name` VARCHAR(30) NOT NULL, PRIMARY KEY (`id`));"
    );
    await q.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `Users` (`id` CHAR(36) NOT NULL , `phone_number` VARCHAR(30) NOT NULL, `first_name` VARCHAR(255), `last_name` VARCHAR(255), `last_connected` DATETIME, `event_id` CHAR(36) NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`event_id`) REFERENCES `Events` (`id`));"
    );
    await q.sequelize.query(
      "CREATE TABLE IF NOT EXISTS `Codes` (`id` CHAR(36) NOT NULL , `code` VARCHAR(30) NOT NULL, `user_id` CHAR(36) NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`));"
    );
  },
  down: async (q) => {
    await q.sequelize.query("DROP TABLE IF EXISTS `Event`;");
    await q.sequelize.query("DROP TABLE IF EXISTS `User`;");
    await q.sequelize.query("DROP TABLE IF EXISTS `Code`;");
  },
};
