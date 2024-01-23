const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const projectFolder = path.resolve(__dirname, 'project-dist');
const copyAssets = path.resolve(__dirname, 'assets');
const copyComponents = path.resolve(__dirname, 'components');
const bundleStyle = path.resolve(__dirname, 'styles');
const template = path.resolve(__dirname, 'template.html');
const bundle = fs.createWriteStream(path.resolve(projectFolder, 'style.css'));

// console.log(copyAssets);

fs.mkdir(projectFolder, {recursive: true}, (err) => {
  if(err) throw err;
})

fs.readdir(bundleStyle, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if(file.isFile()){
      const fileName = path.resolve(bundleStyle, file.name);
      if(path.extname(fileName) === '.css'){
        const read = fs.createReadStream(path.resolve(bundleStyle, fileName));
        read.on('data', (data) => {
          bundle.write(data + '\n');
    });
    }
   }
  });
});

fs.readdir(copyAssets, { withFileTypes: true }, (err, folders) => {
  if(err) throw err;
  fs.mkdir(path.join(projectFolder, 'assets'),{recursive: true}, (err) =>{
    if(err) throw err;
  } )
  const assetsCopy = path.join(projectFolder, 'assets');
  console.log(assetsCopy);
  folders.forEach(folder =>{
      fs.readdir(path.join(copyAssets, folder.name), { withFileTypes: true }, (err, file) => {
    if(err) throw err;

    file.forEach(copy => {
      fs.mkdir(path.join(assetsCopy, folder.name),{recursive: true}, (err) =>{
        if(err) throw err;
      } )
      fs.copyFile(path.join(copyAssets, folder.name, copy.name), path.join(assetsCopy, folder.name, copy.name), (err) => {
        if(err) throw err;
      })
    })

  })
  })


})

let templateData;
let content;
fs.readFile(template, 'utf8',  (err, data) => {
  if(err) throw err;
  templateData = data;
});

fs.readdir(copyComponents, (err, files) => {
  if(err) throw err;

  files.forEach(file => {
    let nameFile = path.basename(path.join(copyComponents, file), '.html');

    fs.stat(path.join(copyComponents, file), (err, stats) => {
      if(err) throw err;
      if (stats.isFile() && path.extname(file) === '.html'){
        fs.readFile(path.join(copyComponents, file), 'utf-8', (err, data) => {
      if(err) throw err;
        content = data;
        const bundleHTML = fs.createWriteStream(path.join(projectFolder, 'index.html'), 'utf-8', 'index.html');
        templateData = templateData.replace(`{{${nameFile}}}`, content);

          bundleHTML.write(templateData);
    })
     }
    })
  })
})