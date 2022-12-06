import db from "../connection.js";

export const getLikes = async () => {
  const queryDef = {
    text: "SELECT * from likes;",
  };

  const data = await db.query(queryDef);

  return data.rows;
};

export const addLike = async (id, user_id) => {
  const post_id = id;

  const data = await db.query(
    `
    INSERT INTO
    likes (posts_id, user_id)
    VALUES ($1, $2)
    RETURNING *;
     `,
    [post_id, user_id]
  );

  return data.rows[0];
};


export const likeAddCounter = async (id) => {
  const post_id = id;

  const data = await db.query(
    `
    UPDATE posts
    SET total_likes = total_likes + 1
    where id = $1
    RETURNING *;
     `,
    [post_id]
  );
  return data.rows[0];
};

export const deleteLike = async (id, user_id) => {

  const post_id = id;
  const data = await db.query(
    `
    DELETE FROM
    likes
    where posts_id = $1
    AND user_id = $2
    RETURNING *;
     `,
    [post_id, user_id]
  );

  return data.rows[0];
};

export const likeDeleteCounter = async (id) => {
  const post_id = id;

  const data = await db.query(
    `
    UPDATE  posts
    SET total_likes = total_likes - 1
    where id = $1
    RETURNING *;
     `,
    [post_id]
  );

  return data.rows[0];
};
