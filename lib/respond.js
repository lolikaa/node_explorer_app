const url = require('url');
const path = require('path');
const fs = require('fs');

const createBreadcrumb = require('./breadcrumb.js');
const createMainContent = require('./mainContent.js');
const getMimeType = require('./getMimeType.js');

const staticBasePath = path.join(__dirname, '..', 'static');

const respond = (request, response) => {

    // creating correct path
    let pathname = url.parse(request.url, true).pathname;
    pathname = decodeURIComponent(pathname);
    const fullStaticPath = path.join(staticBasePath, pathname);

    //favico stop
    if (pathname === '/favicon.ico') {
        return false;
    }

    // błąd 404
    if (!fs.existsSync(fullStaticPath)) {
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
    if (stats.isDirectory()) {
        let data = fs.readFileSync('./static/project_files/index.html');

        // do the title
        let pathElements = pathname.split('/').reverse();
        pathElements = pathElements.filter(element => element !== '');
        const folderName = pathElements[0];
        //   console.log(folderName);

        // bredcrumb
        const breadcrumb = createBreadcrumb(pathname);

        // build table
        const mainContent = createMainContent(fullStaticPath, pathname);

        // replace elements
        data = data.toString().replace('page_title', folderName);
        data = data.replace('pathname', breadcrumb);
        data = data.replace('mainContent', mainContent);

        // showing the data on webpage                         
        response.statusCode = 200;
        response.write(data);
        return response.end();
    }

    //Acess denied!
    if (!stats.isFile()) {
        response.statusCode = 401;
        response.write('401: Access denied!');
        console.log('not a file');
        return response.end();
    }

    // when it's a file
    let fileDetails = {};
    fileDetails.extname = path.extname(fullStaticPath);
    console.log(fileDetails.extname);
    console.log(` fullStaticPath ${fullStaticPath} a to extname: ${fileDetails.extname}`);

    getMimeType(fileDetails.extname)
        .then(mime => {
            let head = {};
            head['Type'] = mime;
            let options ={};
            let statusCode = 200;
        
            // reading a file
        
        
        // we want show files in browser
        const fileStream = fs.createReadStream(fullStaticPath, options);

        response.writeHead(statusCode, head);
        fileStream.pipe(response);

        fileStream.on('close', () => {
            return response.end();
        });
        fileStream.on('error', (error) => {
            response.statusCode = 404;
            response.write('Status 404 - file stream error.');
            return response.end();
        });
        
        })
        .catch(err => {
            console.log(`TO MOJE OSTATNI CATCH ${err}`);
            response.statusCode = 500;
            response.write `<div class="aler alert-danger">Internal Server Error: ${err}</div>`;
            response.end();
        });
}

module.exports = respond;