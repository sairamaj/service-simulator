"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/
// https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf
const http = require("http");
const debug = require("debug");
var config = require('./config');
const App_1 = require("./App");
debug('ts-express:server');
const port = normalizePort(config.app.port);
App_1.default.set('port', port);
const server = http.createServer(App_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    console.log('in onError...');
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            console.log('in default throwing error.');
            throw error;
    }
}
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
    console.log(`provider: ` + config.app.provider);
}
