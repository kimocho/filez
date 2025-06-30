import express from "express";
const folderRouter = express.Router();
export default folderRouter;
import { getFolders, getFolder } from '#db/queries/folders';
import { addFile } from '#db/queries/files';

folderRouter.get('/', async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

folderRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!req.body) res.status(404).send('not found');
  const specificFolder = await getFolder(+id);
  res.send(specificFolder);
});

folderRouter.post('/:id/files', async (req, res) => {
  const { id } = req.params;
  if (!req.body || !req.body.id || !req.body.name || !req.body.size || !req.body.folder_id) {
    res.status(400).send('request body not provided or missing required fields');
  }
  const folder = await getFolder(+id);
  if (!folder) res.status(404).send('not found');
  const newFile = await addFile(req.body.id, req.body.name, req.body.size, req.body.folder_id);
  res.status(201).send(newFile);
});