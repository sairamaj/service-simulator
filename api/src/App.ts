import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import AdminRouter from './routes/AdminRouter';
import ServiceRouter from './routes/ServiceRouter';
import LogRouter from './routes/LogRouter';
import * as mongoose from "mongoose";
import { LogManager } from './providers/LogManager';
import { LoggerStream } from './LoggerStream';
const config = require('./config');
let debug = require('debug')('app')

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();


    this.express.use((err: any, req, res, next) => {
      debug('in error handler.')
      LogManager.log('error', '' + err)
      res.status(500).send(err)
    })
    this.mongoSetup();
  }

  private mongoSetup(): void {
    if (config.app.provider === 'mongo') {
      mongoose.Promise = global.Promise;
      mongoose.connect(config.app.mongoDbConnection, { useNewUrlParser: true });
    }
  }

  // Configure Express middleware.
  private middleware(): void {

    this.express.use(express.static('dashboard/dist/dashboard'))
    this.express.use(logger(':method :url :status :res[content-length] - :response-time ms', {
      stream: new LoggerStream()
    }));

    this.express.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.express.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    // this interceptor is some of the service will append the additional info in the query. (fis: /fissignOnVS.signOnVSsoaphttps )
    this.express.use(function (req, res, next) {
      if (req.url.indexOf('admin') >= 0) {
        next()
        return		// don't do any pre process for admin calls.
      }

      var parts = req.url.split('/')
      req.url = '/' + parts[1]			// take only first part
      next();
    });

    // this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    this.express.use('/api/v1/admin/logs', LogRouter);
    this.express.use('/api/v1/admin/services', AdminRouter);
    this.express.all("*", ServiceRouter);
  }
}

export default new App().express;