export const selectPostsTemplate = `
WITH UserInfo AS (
  SELECT name, email
  FROM users
  WHERE id = ?
)
SELECT 
  json_group_array(
    json_object(
      'id', p.id,
      'user_id', p.user_id,
      'title', p.title,
      'body', p.body,
      'created_at', p.created_at
    )
  ) as posts,
  json_object(
    'name', ui.name,
    'email', ui.email
  ) as userDetail
FROM posts p
CROSS JOIN UserInfo ui
WHERE p.user_id = ?
GROUP BY ui.name, ui.email;
`;

export const selectPostTemplate = `
SELECT *
FROM posts
WHERE id = ?;
`;

export const addPostTemplate = `
INSERT INTO posts (user_id, title, body, id, created_at)
VALUES (?, ?, ?, ?, ?);
`;

export const deletePostTemplate = `DELETE FROM posts WHERE id = ?`;
