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
    SELECT 
    *, (SELECT json_agg(files) AS files FROM files WHERE folders.id = files.folder_id) 
    FROM folders WHERE id = $1
  `;
  const { rows: [folder] } = await db.query(sql, [id]);
  console.log('FOLDERR', folder);
  return folder;
}

export const addFile = async (id, name, size, folderId) => {
  const sql = `
    INSERT INTO files (id, name, size, folder_id)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `;
  const { rows: newFile } = await db.query(sql, [id, name, size, folderId]);
  return newFile;
}
