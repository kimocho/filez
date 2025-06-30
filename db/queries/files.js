import db from "#db/client";

export const createFile = async (name, size, folderId) => {
  const sql = 'INSERT INTO files (name, size, folder_id) VALUES ($1,$2,$3) RETURNING *;';
  const { rows: [createdFile] } = await db.query(sql, [name, size, folderId]);
  return createdFile;
}

export const getFiles = async () => {
  const sql = `
    SELECT files.*, folders.name AS folder_name FROM files
    JOIN folders ON files.folder_id = folders.id;
  `;
  const { rows: allFiles } = await db.query(sql);
  return allFiles;
}
