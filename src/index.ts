// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/
// https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf
import * as http from 'http';
import * as debug from 'debug';
var config = require('./config')

import App from './App';

debug('ts-express:server');

const port = normalizePort(config.app.port);
App.set('port', port);


const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  console.log('in onError...')
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
      console.log('in default throwing error.')
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
  console.log(`provider: ` + config.app.provider);
}