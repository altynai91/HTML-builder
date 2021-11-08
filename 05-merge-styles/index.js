const path = require('path');
const fs = require('fs');
const fromStyles = path.join(__dirname, 'styles/');
const toFolder = path.join(__dirname, 'project-dist/');

let writeableStream = fs.createWriteStream(`${toFolder}bundle.css`);

function createBundle() {
  fs.readdir(fromStyles, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach(file => {
      const extention = path.extname(file).slice(1);

      if (extention === 'css') {
        let readableStream = fs.createReadStream(`${fromStyles}${file}`, 'utf8');
        readableStream.pipe(writeableStream);
      }
    });
  });
}

createBundle();