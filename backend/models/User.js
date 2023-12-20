import { DataTypes } from "sequelize";
import database from "../util/database.js";
import Event from "./Event.js";

// ⓘ JSdoc allow type checking in pure javascript. https://jsdoc.app
/**
 * @typedef UserAttributes
 * @property {string} id
 * @property {string} phone_number
 * @property {string=} first_name
 * @property {string=} last_name
 * @property {string} registration_number
 * @property {Date=} last_connected
 * @property {string} event_id
 * @property {Event=} Event
 */
/**
 * @type {ReturnType<typeof database.define<UserAttributes & import("sequelize").Model<UserAttributes, import("sequelize").Optional<UserAttributes, 'id'>>>>}
 */
const User = database.define("Users", {
  id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    primaryKey: true,
  },
  phone_number: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  registration_number: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  last_connected: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  event_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: Event,
      key: "id",
    },
  },
});

User.belongsTo(Event, {
  foreignKey: "event_id",
});
Event.hasMany(User, {
  foreignKey: "event_id",
});

export default User;
