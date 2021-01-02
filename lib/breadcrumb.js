const path = require('path');

const createBreadcrumb = (pathname) => {

    let pathSeparate = pathname.split('/').filter(element => element !== '');
   // console.log(pathSeparate);
    
    let bredcrumb = `<li class="breadcrumb-item"><a href="/">Home</a></li>`;
    
    let link ='/';
    pathSeparate.forEach((item, index) => {
        link = path.join(link, item);
        if(index !== pathSeparate.length-1){
           
        bredcrumb += `<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`;
        } else {
        bredcrumb += `<li class="breadcrumb-item active" aria-current="page">${item}</li>`;
        }
    });
    return bredcrumb;
};

module.exports = createBreadcrumb;
