import db from '../connection.js';

export const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then((data) => {
      return data.rows;
  });
};

export const getUserById = async (id) => {
  const queryDef = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id],
  };
  const data = await db.query(queryDef);
  return data.rows[0];
};

export const updateUser = async (id, userInfo) => {
  const setColums = Object.keys(userInfo).map((property, index) => `${property}=$${index + 2}`).join(', ');

  const queryDef = {
    text: `
      UPDATE users
      SET ${setColums}
      WHERE id = $1
      RETURNING *
    `,
    values: [id, ...Object.values(userInfo)],
  };

  const data = await db.query(queryDef);
  return data.rows[0];
};
