import { Router, Request, Response, NextFunction } from 'express';
import { ServiceManagerFactory } from '../providers/ServiceManagerFactory';
import { MapDetail } from '../model/MapDetail';
import { resolve } from 'path';
import debugx = require('debug');
let debug = debugx('adminrouter');

export class AdminRouter {
  router: Router

  /**
   * Initialize the AdminRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all services.
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    var services = await ServiceManagerFactory.createServiceManager().getServices();
    res.send(services);
  }

  /**
   * GET one service by name
   */
  public async getOne(req: Request, res: Response, next: NextFunction) {
    let name = req.params.name;
    var service = await ServiceManagerFactory.createServiceManager().getService(name)
    if (service) {
      res.status(200)
        .send(service);
    }
    else {
      res.status(404)
        .send({
          message: name + ' service not found.'
        });
    }
  }

  public async getProcessedRequests(req: Request, res: Response) {
    let name = req.params.name;
    var processedRequests = await ServiceManagerFactory.createServiceManager().getProcessedRequests(name);
    res.send(processedRequests);
  }


  public async getProcessedRequestById(req: Request, res: Response) {
    let name = req.params.name;
    let id = req.params.id;

    try {
      var processedRequest = await ServiceManagerFactory.createServiceManager().getProcessedRequest(name, id);
      if (processedRequest !== undefined) {
        res.status(200).send(processedRequest)
      } else {
        console.log('returning 404')
        res.status(404).send({})
      }
    } catch (error) {
      debug('error:' + error)
      res.status(500).send(error)
    }
  }


  public async deleteProcessedRequests(req: Request, res: Response) {
    let name = req.params.name;
    var result = await ServiceManagerFactory.createServiceManager().clearProcessedRequests(name);
    if (result) {
      res.status(200).send([])
    } else {
      res.status(500).send([])
    }
  }

  public async getMapDetails(req: Request, res: Response) {
    debug('enter getMapDetail.')
    let serviceName = req.params.name;
    let mapName = req.params.mapName;

    try {
      var result = await ServiceManagerFactory.createServiceManager().getMapDetail(serviceName, mapName)
      if (result === undefined) {
        res.status(404).send({})
      } else {
        res.send(result)
      }
    } catch (error) {
      debug('getMapDetail error:' + error)
      res.status(500).send(error)
    }
  }

  public async testService(req: Request, res: Response) {
    let serviceName = req.params.name;
    try {
      var requestData = await this.getRequest(req);
      var processInfo = await ServiceManagerFactory.createServiceManager().getResponse(serviceName, requestData)
      if (processInfo === undefined) {
        res.send({
          status: 404
        })
      } else {
        res.send({
          status: 200,
          response: processInfo.response,
          matches: processInfo.matches
        })
      }
    } catch (error) {
      debug('error:' + error)
      res.send({
        status: 500
      })

    }
  }

  private async getRequest(req: Request): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      var requestData = JSON.stringify(req.body)
      if (requestData !== undefined && requestData.length > 2) {
        resolve(JSON.stringify(requestData));
      } else {
        requestData = '';
        req.on('data', chunk => {
          requestData += chunk;
        });

        req.on('end', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(requestData);
          }
        });
      }
    });
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:name', this.getOne)
    this.router.get('/:name/processedrequests', this.getProcessedRequests)
    this.router.get('/:name/processedrequests/:id', this.getProcessedRequestById)
    this.router.delete('/:name/processedrequests', this.deleteProcessedRequests)
    this.router.get('/:name/maps/:mapName', this.getMapDetails)

    this.router.post('/:name/test', async (req: Request, resp: Response) => {
      await this.testService(req, resp);
    });
  }
}

// Create the AdminRouter, and export its configured Express.Router
const adminRoutes = new AdminRouter();
adminRoutes.init();

export default adminRoutes.router;