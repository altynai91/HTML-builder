const fs = require('fs');
const {writeFile, readFile, readdir} = require('fs/promises');
const path = require('path');
const fsp = require('fs/promises');

const fullDist = path.join(__dirname, 'project-dist/');
const htmlFile = path.join(__dirname, 'template.html');
const styles = path.join(__dirname, 'styles/');
const components = path.join(__dirname, 'components/');
const newAssets = path.join(__dirname, 'project-dist/assets/');
const assets = path.join(__dirname, 'assets/');
console.log(newAssets);

let writeableStream = fs.createWriteStream(`${fullDist}style.css`);

fs.mkdir(fullDist, {recursive: true}, err => { 
  if (err && err.code != 'EEXIST') {
    throw 'up';
  }
  assetsCopy(assets, newAssets);
});

async function assetsCopy(src, dest) {
  const files = await fsp.readdir(src, { withFileTypes: true });
  await fsp.mkdir(dest, {recursive: true}, err => { 
    if (err && err.code != 'EEXIST') {
      throw 'up';
    }
    assetsCopy(assets, newAssets);
  });
  for (let file of files) {
    const folderInAssets = path.join(src, file.name);
    const folderInNewAssets = path.join(dest, file.name);
    if (file.isDirectory()) {
      assetsCopy(folderInAssets, folderInNewAssets);
    } else {
      await fsp.copyFile(folderInAssets, folderInNewAssets);
    }
  }
}

async function createHTML() {
  let template = await readFile(htmlFile, 'utf8');
  const files = await readdir(components);
  const arr = [];

  for await (const file of files) {
    const text = await readFile(`${components}${file}`, 'utf8');
    const fileName = file.replace('.html', '');
    arr.push([fileName, text]);
  }

  for (const [templateText, htmlText] of arr) {
    template = template.replace(`{{${templateText}}}`, htmlText);
  }
  await writeFile(`${fullDist}index.html`, template);
}
createHTML();

function createCSS() {
  fs.readdir(styles, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach(file => {
      const ext = path.extname(file).slice(1);

      if (ext === 'css') {
        let readableStream = fs.createReadStream(`${styles}${file}`, 'utf8');
        readableStream.pipe(writeableStream);
      }
    });
  });
}
createCSS();
