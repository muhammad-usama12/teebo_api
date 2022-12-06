import db from '../connection.js';

export const getFavourites = () => {
  return db.query(
    `
  SELECT *
  FROM user_tvshows;
    `
  )
    .then((data) => {
      return data.rows;
    });
};

export const addFavourite = async (favourite) => {
  const setColumns = [...Object.values(favourite)];
  console.log("setColumns", setColumns);
  const data = await db.query(
    `
      INSERT INTO user_tvshows (user_id, tvshow_id)
      SELECT $1,$2
      WHERE
        NOT EXISTS (
          SELECT user_id, tvshow_id
          FROM user_tvshows
          WHERE user_id = $1
          AND tvshow_id = $2
        )
      RETURNING *;
      `,
    [...setColumns]
  );

  return data.rows[0];
};

export const deleteFavourite = async (favourite) => {
  const setColumns = [...Object.values(favourite)];
  const data = await db.query(
    `
      DELETE FROM user_tvshows
      WHERE user_id = $1
      AND tvshow_id = $2
      RETURNING *;
      `,
    [...setColumns]
  );

  return data.rows[0];
};
