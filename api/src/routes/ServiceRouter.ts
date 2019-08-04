import { Router, Request, Response, NextFunction } from 'express';
import { ServiceManagerFactory } from "../providers/ServiceManagerFactory";
import { ProcessedRequest } from '../model/ProcessedRequest';
import { ProcessInfo } from '../model/ProcessInfo';
var debug = require('debug')('servicerouter')
const url = require('url');

export class ServiceRouter {
    router: Router

    /**
     * Initialize the ServiceRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /** 
     * POST service
     */
    public async handle(req: Request, res: Response, serviceName: string, requestData: string, next: NextFunction) {
        try {
            debug(`handle: ${serviceName}`);
            var serviceManager = ServiceManagerFactory.createServiceManager();
            var processInfo = await serviceManager.getResponse(serviceName, requestData);
            if (processInfo) {
                debug(`processInfo.responseAsAny: ${processInfo.responseBuffer.length}`);
                res.status(200).
                    set({ 'content-type': processInfo.getResponseContentType() })
                    .send(processInfo.responseBuffer)
            } else {
                res.status(404)
                    .send({
                        message: 'no match found.'
                    });
            }
        } catch (error) {
            debug('error:' + error)
            next(error)
        }
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        //   this.router.post('*', this.handle);
        this.router.post('*', async (req: Request, resp: Response, next: NextFunction) => {
            var requestData = await this.getRequest(req);
            var parts = req.url.split('/')
            var serviceName = parts[parts.length - 1]
            await this.handle(req, resp, serviceName, requestData, next);
        });
        this.router.get('*', async (req: Request, resp: Response, next: NextFunction) => {
            debug(`init.get ${req.url}`);
            var parts = req.url.split('/')
            const urlData = url.parse(req.url);
            await this.handle(req, resp, urlData.pathname.replace('/',''), req.url , next);
        //     var parts = req.url.split('/')
        //     var serviceName = parts[parts.length - 1]
        //     debug(`init.get servicename : ${serviceName}`);
        //     resp.send(`dummy data for now ${serviceName}`);
         });
    }

    async getRequest(req: Request): Promise<string> {
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
}

// Create the ServiceRouter, and export its configured Express.Router
const serviceRoutes = new ServiceRouter();
serviceRoutes.init();

export default serviceRoutes.router;

