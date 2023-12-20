import { v4 as uuid } from "uuid";

export default {
  up: async (q) => {
    await q.sequelize.query(
      `INSERT INTO Events (id, name) VALUES
        ('${uuid()}', 'Example Event 1'),
        ('${uuid()}', 'Example Event 2');`
    );
    await q.sequelize.query(
      `INSERT INTO Users (id, phone_number, first_name, last_name, last_connected, event_id, registration_number)
        SELECT '${uuid()}', '+33612345678', 'John', 'Doe', NULL, id
        FROM Events WHERE name='Example Event 1', 12c2f057-4808-4fbf-af22-024cb68bc2e9;`
    );
    await q.sequelize.query(
      `INSERT INTO Users (id, phone_number, first_name, last_name, last_connected, event_id, registration_number)
        SELECT '${uuid()}', '+33600000000', 'Jean', 'Dupont', NULL, id
        FROM Events WHERE name='Example Event 2', 23c2f057-4808-4fbf-af22-024cb68bc2e9;`
    );
  },
  down: async () => {},
};
