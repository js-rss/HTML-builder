const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const folderPath = path.join(__dirname, '/secret-folder');


fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
   if (err) {return err}
  files.forEach((file) => {
    //console.log(file.name[0])
    if (file.isFile()) {
     /*if (file.name[0] === '.') {
      
        const fileName = file.name.split('.').slice(1).join('');
        
        const filePath = path.join(__dirname, './secret-folder', fileName);

        const fileExtension = "no Etension";
        console.log(fileName,filePath,fileExtension,"jjjjjjj")
      }*/
                 
      const fileName = file.name[0] !== '.' ? file.name.split('.').slice(0, -1).join('.') : '.' + file.name.split('.').slice(1).join('');
      const filePath = path.join(__dirname, './secret-folder', file.name);
      const fileExtension = path.extname(filePath) ? path.extname(filePath).slice(1) : '" no Extension "'
           
      fs.stat(filePath, (err, file) => {
        if (err) {return err;}
        const fileSize = file.size / 1024;
       stdout.write(fileName + ' - ' + fileExtension + ' - ' + fileSize.toFixed(2) + ' kb\n');
       });
      }
     });
  
    });
  
