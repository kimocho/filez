import express from "express";
import folderRouter from "./api/folders.js";
const app = express();
export default app;


app.use(express.json());

app.use('/folders', folderRouter);

app.get('/files', (req, res) => {
  res.send('sends array of all files + name of containing folder as folder_name');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});