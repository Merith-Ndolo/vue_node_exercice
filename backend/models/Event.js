import { DataTypes } from "sequelize";
import database from "../util/database.js";

// ⓘ JSdoc allow type checking in pure javascript. https://jsdoc.app
/**
 * @typedef EventAttributes
 * @property {string} id
 * @property {string} name
 */
/**
 * @type {ReturnType<typeof database.define<EventAttributes & import("sequelize").Model<EventAttributes, import("sequelize").Optional<EventAttributes, 'id'>>>>}
 */
const Event = database.define("Events", {
  id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

export default Event;
