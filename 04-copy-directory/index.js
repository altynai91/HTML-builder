const fs = require('fs/promises');
const path = require('path');  

let newDir = path.join(__dirname, 'files-copy');
let mainDir = path.join(__dirname, 'files');

async function copyDir() {
  await fs.mkdir(newDir, {recursive: true});
  await changedFiles(newDir);
  const files = await fs.readdir(mainDir, {withFileTypes: true}); 
  for (let file of files) {
    try {
      const filePath = path.join(mainDir, file.name);
      const newFilePath = path.join(newDir, file.name);
      await fs.copyFile(filePath, newFilePath);
    } 
    catch(err) {
      console.error(err);
    }
  }
}
copyDir();

async function changedFiles(folder) {
  try {
    const files = await fs.readdir(folder);
    for (let file of files) {
      await fs.unlink(path.join(folder, file));
    }
  } 
  catch (err) {
    console.error(err);
  }
}