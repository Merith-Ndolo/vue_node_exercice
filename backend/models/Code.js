import { DataTypes } from "sequelize";
import database from "../util/database.js";
import User from "./User.js";

// ⓘ JSdoc allow type checking in pure javascript. https://jsdoc.app
/**
 * @typedef CodeAttributes
 * @property {string} id
 * @property {string} code
 * @property {string} user_id
 * @property {User=} User
 */
/**
 * @type {ReturnType<typeof database.define<CodeAttributes & import("sequelize").Model<CodeAttributes, import("sequelize").Optional<CodeAttributes, 'id'>>>>}
 */
const Code = database.define("Codes", {
  id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

Code.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Code, {
  foreignKey: "user_id",
});

export default Code;
