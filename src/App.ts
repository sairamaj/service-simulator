import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import AdminRouter from './routes/AdminRouter';
import ServiceRouter from './routes/ServiceRouter';
import LogRouter from './routes/LogRouter';
import * as mongoose from "mongoose";
const config = require('./config');

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.mongoSetup();
  }

  private mongoSetup(): void {
    if (config.app.provider === 'mongo') {
      mongoose.Promise = global.Promise;
      mongoose.connect(config.app.mongoDbConnection,{useNewUrlParser: true});
    }
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));

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
    
    // this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    this.express.use('/api/v1/admin/services', AdminRouter);
    this.express.all("*", ServiceRouter);
  }
}

export default new App().express;