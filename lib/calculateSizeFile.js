const calculateSizeFile = stats => {
    let filesizeBytes = stats.size; // bytes
  //  console.log(filesizeBytes);
    let filesize;
    
   
        if(filesizeBytes<1024) {
             filesize=`${filesizeBytes} B`;
           // console.log(filesize);
        }
        else if(filesizeBytes>=1024 && filesizeBytes<=1048576) {
            filesize=`${(filesizeBytes/1024).toFixed(0)} KB`;
           // console.log(filesize);
        }
        else if(filesizeBytes>=1048576 && filesizeBytes<=1073741824) {
            filesize=`${(filesizeBytes/1048576).toFixed(1)}  MB`;
           // console.log(filesize);
        }
    
       
    return [filesize, filesizeBytes];
}

module.exports = calculateSizeFile;