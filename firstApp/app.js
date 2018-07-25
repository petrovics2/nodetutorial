
//Path module
const path = require('path');

var pathObj = path.parse(__filename);
console.log(pathObj);

//OS module
const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory: ' + totalMemory);

//Template string
//ES6 / ES2015 : ECMAScript 6

console.log(`Free Memory: ${freeMemory}`);

//FileSystem module
const fs = require('fs');

const files = fs.readdirSync('./');

console.log(files);

const filesA = fs.readdir('./', function(err, files) {
    if (err) {
        console.log(`Error ${err}`);        
    } else {
        console.log(`Result: ${files}`);        
    }
});

//Events module

const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

//Register a listener
logger.on('messageLogged', function(arg) {
    console.log('Listener called', arg);
})

logger.log('message');

//HTTP module

const http = require('http');

const server = http.createServer(function(req, res) {
    if (req.url === '/') {
        res.write('Hellow world');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3]))
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000...');