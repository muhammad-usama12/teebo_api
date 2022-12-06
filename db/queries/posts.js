import db from "../connection.js";

export const getPosts = async () => {
  const data = await db.query("SELECT * FROM posts ORDER BY posts.id DESC");

  return data.rows;
};

export const addPost = async (userId, post) => {

  const setColumns = [...Object.values(post.data)];

  const data = await db.query(
    `
      INSERT INTO posts (text, image, spoiler, tvshow_id, user_id) VALUES ($1,$2,$3,$4,$5)
      RETURNING *;
      `,
    [...setColumns, userId]
  );

  return data.rows[0];
};

export const deletePost = async (id) => {
  const data = await db.query(
    `
      DELETE FROM posts
      WHERE id = $1
      RETURNING *;
      `,
    [id]
  );

  return data.rows[0];
};


