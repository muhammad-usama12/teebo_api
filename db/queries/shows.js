import db from "../connection.js";

export const getMovies = async () => {
  const data = await db.query("SELECT * FROM tvshows ORDER BY name ASC");
  return data.rows;
};

export const getMovieById = async (id) => {
  const queryDef = {
    text: "SELECT * FROM MOVIES WHERE id = $1",
    values: [id],
  };

  const data = await db.query(queryDef);
  return data.rows[0];
};

export const updateMovie = async (id, movieInfo) => {
  const setColums = Object.keys(movieInfo)
    .map((property, index) => `${property}=$${index + 2}`)
    .join(", ");

  const queryDef = {
    text: `
      UPDATE movies
      SET ${setColums}
      WHERE id = $1
      RETURNING *
    `,
    values: [id, ...Object.values(movieInfo)],
  };

  console.log(queryDef);
  const data = await db.query(queryDef);
  return data.rows[0];
};

export const newShow = async ({ name, image_url }) => {
  const data = await db.query(
    `
        INSERT INTO tvshows (name, image_url) VALUES ($1,$2)
        RETURNING *;
        `,
    [name, image_url]
  );

  return data.rows[0];
};
