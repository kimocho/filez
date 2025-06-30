import express from "express";
import folderRouter from "./api/folders.js";
const app = express();
export default app;
import { getFiles } from './db/queries/files.js';

app.use(express.json());

app.use('/folders', folderRouter);

app.get('/files', async (req, res) => {
  const allFiles = await getFiles();
  res.send(allFiles);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});