const fs = require('fs');
const path = require('path');

const calculateSizeFile = require('./calculateSizeFile.js');

const createMainContent = (fullStaticPath, pathname) => {
    let mainContent = '';
    let items;
    let itemDetails = { };

    try {
        items = fs.readdirSync(fullStaticPath);
        // console.log(items);
    } catch (err) {
        console.log(`readdirSync error: ${err}`);
        return `<div class="alert alert-danger">Internal Server</div>`
    }

    items.forEach(item => {
        const link = path.join(pathname, item);
        itemDetails.name = item;
        
        const itemFullStaticPath = path.join(fullStaticPath, item);
        
        try {
            itemDetails.stats = fs.statSync(itemFullStaticPath);
        } catch (err) {
            mainContent = `<div class="aler alert-danger">Internal Server Error: ${err}</div>`;
            return false;
        }
        
        // check is this directory or a file  -> icons and size method call
        if(itemDetails.stats.isDirectory()){
            itemDetails.icon = '<ion-icon name="folder-sharp"></ion-icon>'; // icon
            
            itemDetails.size = '---'; // static no size value
            
        } else if(itemDetails.stats.isFile()){
            itemDetails.icon ='<ion-icon name="document-sharp"></ion-icon>'; //  icon
            
             [itemDetails.size, itemDetails.sizeBytes] = calculateSizeFile(itemDetails.stats); // size 
        }
        
        
        //last modification of file/dir
        itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);
        itemDetails.date = new Date(itemDetails.timeStamp);
        
        itemDetails.date = itemDetails.date.toLocaleString();
        
      //  console.log(itemDetails.date);

        // create table rows
        mainContent += `
            <tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}" data-time="${itemDetails.timeStamp}">
            <td><a href="${link}">${itemDetails.icon} ${item}</a></td>
            <td>${itemDetails.size}</td>
            <td>${itemDetails.date}</td>
            </tr>`
    });

    // return rows
    return mainContent;
};

module.exports = createMainContent;