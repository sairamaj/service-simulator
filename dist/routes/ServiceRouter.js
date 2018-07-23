"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServiceManagerFactory_1 = require("../providers/ServiceManagerFactory");
const ProcessInfo_1 = require("../model/ProcessInfo");
var debug = require('debug')('servicerouter');
class ServiceRouter {
    /**
     * Initialize the ServiceRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * POST service
     */
    handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var requestData = yield this.getRequest(req);
                var parts = req.url.split('/');
                var serviceName = parts[parts.length - 1];
                var serviceManager = ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager();
                var processInfo = yield serviceManager.getResponse(serviceName, requestData);
                if (processInfo) {
                    serviceManager.logRequest(serviceName, new Date(), 200, processInfo);
                    res.status(200).
                        set({ 'content-type': 'text/xml; charset=utf-8' })
                        .send(processInfo.response);
                }
                else {
                    serviceManager.logRequest(serviceName, new Date(), 404, new ProcessInfo_1.ProcessInfo(requestData));
                    res.status(404)
                        .send({
                        message: 'no match found.'
                    });
                }
            }
            catch (error) {
                debug('error:' + error);
                serviceManager.logRequest(serviceName, new Date(), 500, new ProcessInfo_1.ProcessInfo(requestData));
                res.status(500)
                    .send(error);
            }
        });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        //   this.router.post('*', this.handle);
        this.router.post('*', (req, resp) => __awaiter(this, void 0, void 0, function* () {
            yield this.handle(req, resp, null);
        }));
    }
    getRequest(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var requestData = JSON.stringify(req.body);
                if (requestData !== undefined && requestData.length > 2) {
                    resolve(JSON.stringify(requestData));
                }
                else {
                    requestData = '';
                    req.on('data', chunk => {
                        requestData += chunk;
                    });
                    req.on('end', (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(requestData);
                        }
                    });
                }
            });
        });
    }
}
exports.ServiceRouter = ServiceRouter;
// Create the ServiceRouter, and export its configured Express.Router
const serviceRoutes = new ServiceRouter();
serviceRoutes.init();
exports.default = serviceRoutes.router;
