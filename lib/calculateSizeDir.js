const getSize = require('get-folder-size');


const calculateSizeDir = (itemFullStaticPath) => {
    var regEx = /\s/gmu;
    const itemFullStaticPathClean = itemFullStaticPath.toString().replace(regEx,"\ ");
    let sizeDir, sizeDirMB;
  

getSize(itemFullStaticPathClean, (err, size) => {
        if (err) {
            throw err;
        } 
        let sizeMB = ((size / 1024 / 1024).toFixed(2))    
 //  console.log(` ${size} / ${sizeMB} dla ${itemFullStaticPathClean}`);
  //  sizeDir=size;
  //  sizeDirMB=sizeMB;
 //  console.log(`sizeDir = ${sizeDir} | sizeDirMB = ${sizeDirMB}`);
    
    return new Promise((resolve, reject) => {
    
    sizeDir=size;
    sizeDirMB=sizeMB;})

    });
       
    return [sizeDirMB,sizeDir]
};
module.exports = calculateSizeDir;
