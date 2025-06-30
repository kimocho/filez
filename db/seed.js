import db from "#db/client";
import { createFile } from "./queries/files.js";
import { createFolder } from "./queries/folders.js";

async function seed() {
  // TODO
  await db.connect();
  const folder1 = await createFolder("folder1");
  const folder2 = await createFolder("folder2");
  const folder3 = await createFolder("folder3");
  await createFile("art", 10, folder1.id);
  await createFile("art1", 10, folder1.id);
  await createFile("art2", 10, folder1.id);
  await createFile("art3", 10, folder1.id);
  await createFile("art4", 10, folder1.id);
  await createFile("art", 10, folder2.id);
  await createFile("art1", 10, folder2.id);
  await createFile("art2", 10, folder2.id);
  await createFile("art3", 10, folder2.id);
  await createFile("art4", 10, folder2.id);
  await createFile("art", 10, folder3.id);
  await createFile("art1", 10, folder3.id);
  await createFile("art2", 10, folder3.id);
  await createFile("art3", 10, folder3.id);
  await createFile("art4", 10, folder3.id);
  await db.end();
  console.log("🌱 Database seeded.");
}

seed();