import db from "#db/client";

export const createFolder = async (name) => {
  const sql = 'INSERT INTO folders (name) VALUES ($1) RETURNING *;';
  const { rows: [createdFolder] } = await db.query(sql, [name]);
  return createdFolder;
}

export const getFolders = async () => {
  const sql = `SELECT * FROM folders`;
  const { rows: allFolders } = await db.query(sql);
  return allFolders;
}

export const getFolder = async (id) => {
  const sql = `
    SELECT *, (SELECT json_agg(files) FROM files WHERE folders.id = files.folder_id) AS files
    FROM folders WHERE folders.id=$1
  `;
  const { rows: [folder] } = await db.query(sql, [id]);
  return folder;
}

export const addFile = async (name, size, folderId) => {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1,$2,$3)
    RETURNING *
  `;
  const { rows: [newFile] } = await db.query(sql, [name, size, folderId]);
  return newFile;
}
