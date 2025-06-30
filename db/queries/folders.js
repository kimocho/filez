import db from "#db/client";

export const createFolder = async (name) => {
  const sql = 'INSERT INTO folders (name) VALUES ($1) RETURNING *;';
  const { rows: [createdFolder] } = await db.query(sql, [name]);
  return createdFolder;
}

export const getFolders = async () => {
  const sql = 'SELECT * FROM folders';
  const { rows: allFolders } = await db.query(sql);
  console.log(allFolders);
  return allFolders;
}

export const getFolder = async () => {
  const sql = `
    SELECT 
    *, (SELECT json_agg(files) FROM files WHERE folders.id = files.folder_id) 
    FROM folders
  `;
  const { rows: folder } = await db.query(sql);
  console.log(folder);
  return folder;
}

// export async function getPersonsIncludingLicense() {
//   const sql = `
//   SELECT
//     *,
//     (
//       SELECT to_json(licenses)
//       FROM licenses
//       WHERE licenses.person_id = persons.id
//     ) AS license
//   FROM persons
//   `;
//   const { rows: persons } = await db.query(sql);
//   return persons;
// }