const url = require('url');
const path = require('path');
const fs = require('fs');

const createBreadcrumb = require('./breadcrumb.js');

const staticBasePath = path.join(__dirname, '..','static');

const respond = (request, response) => {
    
    // creating correct path
    let pathname = url.parse(request.url,true).pathname;
    pathname = decodeURIComponent(pathname);
    const fullStaticPath = path.join(staticBasePath, pathname);
    
    //favico stop
    if (pathname ==='/favicon.ico') { return false; }
    
    // błąd 404
    // TODO zrobić jakiś ładne info o błędach
    if(!fs.existsSync(fullStaticPath)){
        console.log(`${fullStaticPath} does not exist`);
        response.write('404: File not found!'); 
        response.end();
        return false;
    } 
    
    let stats;
    try {
        stats = fs.lstatSync(fullStaticPath);
    } catch (err) {
        console.log(`lstatSync Error: ${err}`);
    }
  
// when it's directory
   if(stats.isDirectory){
       let data = fs.readFileSync('./project_files/index.html');
       
       // do the title
       let pathElements = pathname.split('/').reverse();
       pathElements = pathElements.filter(element => element !== '');
       const folderName = pathElements[0];
       console.log(folderName);
       data = data.toString().replace('page_title', folderName);
       
       // bredcrumb
       const breadcrumb = createBreadcrumb(pathname);
       data = data.replace('pathname', breadcrumb);
       
           
      
                                  
        response.statusCode=200;
        response.write(data);
        response.end();
   }
}

module.exports = respond;