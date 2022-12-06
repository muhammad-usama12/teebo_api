import db from '../connection.js';

export const getWatchlist = () => {
  return db.query(
    `
  SELECT *
  FROM watchlist;
    `
  )
    .then((data) => {
      return data.rows;
    });
};

export const addToWatchlist = async (show) => {
  const setColumns = [...Object.values(show)];
  console.log("setColumns", setColumns);
  const data = await db.query(
    `
      INSERT INTO watchlist (user_id, tvshow_id)
      SELECT $1,$2
      WHERE
        NOT EXISTS (
          SELECT user_id, tvshow_id
          FROM watchlist
          WHERE user_id = $1
          AND tvshow_id = $2
        )
      RETURNING *;
      `,
    [...setColumns]
  );

  return data.rows[0];
};

export const deleteFromWatchlist = async (show) => {
  const setColumns = [...Object.values(show)];
  const data = await db.query(
    `
      DELETE FROM watchlist
      WHERE user_id = $1
      AND tvshow_id = $2
      RETURNING *;
      `,
    [...setColumns]
  );

  return data.rows[0];
};
