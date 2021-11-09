const fs = require('fs');
const path = require('path');

fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true}, function(error, items) {
  for (let i=0; i<items.length; i++) {
    fs.stat(`03-files-in-folder/secret-folder/${items[i].name}`, (error, stats) => {
      if (error) {
        console.log(error);
      }
      else if (items[i].isFile()) {
        console.log(path.basename(items[i].name, path.extname(items[i].name)) + ' - ' + path.extname(items[i].name).slice(1) + ' - ' + stats.size + 'kb');
      }
      else if (items[i].isDirectory()) {
        return;
      }
    });
  }
});