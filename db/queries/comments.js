import db from "../connection.js";

export const getComments = async () => {
  const queryDef = {
    text: "SELECT * from comments ORDER BY comments.created_at ASC",
  };

  const data = await db.query(queryDef);

  return data.rows;
};

export const addComment = async (comment) => {
  const setColumns = [...Object.values(comment)];
  console.log("setColumns in comments", setColumns);

  const data = await db.query(
    `
     INSERT INTO comments (text, post_id, user_id) VALUES ($1, $2, $3)
     RETURNING *;
     `,
    [...setColumns]
  );
  return data.rows[0];
};

export const commentCounter = async (id) => {
  const post_id = id;

  const data = await db.query(
    `
    UPDATE posts
    SET total_comments = total_comments + 1
    where id = $1
    RETURNING *;
     `,
    [post_id]
  );
console.log("updated counter by 1", data.rows[0])
  return data.rows[0];
};
