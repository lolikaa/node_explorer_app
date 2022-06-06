//require node modules
const http = require('http');

//file imports
const respond = require('./lib/respond.js');

// create server
const port = process.env.port || 8000;
const server = http.createServer(respond);

//listen port
server.listen(port, '0.0.0.0' () => {
    console.log(`nasluchuje portu: ${port}`);
});
