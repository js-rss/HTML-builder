const fs = require('fs');
const path = require('path');

const style = path.resolve(__dirname, 'styles');
const projectDist = path.resolve(__dirname, 'project-dist');
const bundle = fs.createWriteStream(path.resolve(projectDist, 'bundle.css'));

fs.readdir(style, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if(file.isFile()){
      const fileName = path.resolve(style, file.name);
    if(path.extname(fileName) === '.css'){
      const read = fs.createReadStream(path.resolve(style, fileName));
        read.on('data', (data) => {
        bundle.write(data + '\n');
    });
    }
   }
  });
});