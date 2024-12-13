export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
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
