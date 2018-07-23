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
class LogRouter {
    /**
     * Initialize the AdminRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all log requests.
     */
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = req.params.name;
            var processedRequests = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getProcessedRequests(name);
            res.send(processedRequests);
        });
    }
    deleteAll(req, res) {
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
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.delete('/', this.deleteAll);
    }
}
exports.LogRouter = LogRouter;
// Create the AdminRouter, and export its configured Express.Router
const adminRoutes = new LogRouter();
adminRoutes.init();
exports.default = adminRoutes.router;
