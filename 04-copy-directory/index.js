const fs = require('fs');
const path = require('path');
const srcFolder =  path.resolve(__dirname, 'files');
const copyFolder = path.resolve(__dirname, 'files-copy');

fs.rm(copyFolder, {force:true, recursive: true}, (err) =>{
  if (err) throw err;
  fs.mkdir(copyFolder, {recursive: true}, (err) =>{
  if (err) throw err;
   fs.readdir(srcFolder, {withFileTypes:true}, (err, files) =>{
   if (err) throw err;
     files.forEach(file => {
     fs.copyFile(path.resolve(srcFolder, file.name), path.resolve(copyFolder, file.name), (err) => {
   if (err) throw err;
     } );
    });
   });     
  });
});