import express from "express";
const folderRouter = express.Router();
export default folderRouter;
import { getFolders, getFolder } from '../db/queries/folders.js';

folderRouter.get('/', (req, res) => {
  const folders = getFolders();
  res.send(folders);
});

folderRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!req.body.id) res.status(404).send('not found');
  const specificFolder = await getFolder();
  res.send(specificFolder)
});

folderRouter.post('/:id/files', (req, res) => {
  if (!req.body) res.status(400).send('request body not provided or missing required fields');
  console.log(req.body);
  const folders = getFolders();
  if (!folders) res.status(404).send('not found');
});