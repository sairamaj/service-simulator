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
const debugx = require("debug");
let debug = debugx('adminrouter');
class AdminRouter {
    /**
     * Initialize the AdminRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all services.
     */
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var services = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getServices();
            res.send(services);
        });
    }
    /**
     * GET one service by name
     */
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = req.params.name;
            var service = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getService(name);
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
        });
    }
    getProcessedRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = req.params.name;
            var processedRequests = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getProcessedRequests(name);
            res.send(processedRequests);
        });
    }
    getProcessedRequestById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = req.params.name;
            let id = req.params.id;
            try {
                var processedRequest = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getProcessedRequest(name, id);
                if (processedRequest !== undefined) {
                    res.status(200).send(processedRequest);
                }
                else {
                    console.log('returning 404');
                    res.status(404).send({});
                }
            }
            catch (error) {
                debug('error:' + error);
                res.status(500).send(error);
            }
        });
    }
    deleteProcessedRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = req.params.name;
            var result = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().clearProcessedRequests(name);
            if (result) {
                res.status(200).send([]);
            }
            else {
                res.status(500).send([]);
            }
        });
    }
    getMapDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter getMapDetail.');
            let serviceName = req.params.name;
            let mapName = req.params.mapName;
            try {
                var result = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getMapDetail(serviceName, mapName);
                if (result === undefined) {
                    res.status(404).send({});
                }
                else {
                    res.send(result);
                }
            }
            catch (error) {
                debug('getMapDetail error:' + error);
                res.status(500).send(error);
            }
        });
    }
    testService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let serviceName = req.params.name;
            try {
                var requestData = yield this.getRequest(req);
                var processInfo = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getResponse(serviceName, requestData);
                if (processInfo === undefined) {
                    res.send({
                        status: 404
                    });
                }
                else {
                    res.send({
                        status: 200,
                        response: processInfo.response,
                        matches: processInfo.matches
                    });
                }
            }
            catch (error) {
                debug('error:' + error);
                res.send({
                    status: 500
                });
            }
        });
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
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:name', this.getOne);
        this.router.get('/:name/processedrequests', this.getProcessedRequests);
        this.router.get('/:name/processedrequests/:id', this.getProcessedRequestById);
        this.router.delete('/:name/processedrequests', this.deleteProcessedRequests);
        this.router.get('/:name/maps/:mapName', this.getMapDetails);
        this.router.post('/:name/test', (req, resp) => __awaiter(this, void 0, void 0, function* () {
            yield this.testService(req, resp);
        }));
    }
}
exports.AdminRouter = AdminRouter;
// Create the AdminRouter, and export its configured Express.Router
const adminRoutes = new AdminRouter();
adminRoutes.init();
exports.default = adminRoutes.router;
