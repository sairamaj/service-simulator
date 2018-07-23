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
const Service_1 = require("../model/Service");
56;
const glob = require("glob");
const path = require("path");
const ServiceFileProvider_1 = require("./ServiceFileProvider");
const ProcessedRequest_1 = require("../model/ProcessedRequest");
const ProcessedLogFileManager_1 = require("./ProcessedLogFileManager");
var debug = require('debug')('servicesfileprovider');
class ServicesFileProvider {
    getServices() {
        debug('enter:getServices');
        var services = [];
        debug('reading :' + this.getDataDirectory() + '/*');
        return new Promise((resolve, reject) => {
            glob(this.getDataDirectory() + '/*', (err, dirs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(dirs.map(d => {
                        var name = d.split('/').slice(-1)[0];
                        return new Service_1.Service(name, new ServiceFileProvider_1.ServiceFileProvider(name).getConfigMap());
                    }));
                }
            });
        });
    }
    getService(name) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter:getService');
            var services = yield this.getServices();
            return services.find(s => s.name == name);
        });
    }
    getMapDetail(name, mapName) {
        return __awaiter(this, void 0, void 0, function* () {
            var serviceProvider = new ServiceFileProvider_1.ServiceFileProvider(name);
            return yield serviceProvider.getMapDetail(mapName);
        });
    }
    getResponse(name, request) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter:getResponse');
            var serviceProvider = new ServiceFileProvider_1.ServiceFileProvider(name);
            var processInfo = yield serviceProvider.getResponse(request);
            if (processInfo === undefined) {
                return null;
            }
            return processInfo;
        });
    }
    getDataDirectory() {
        return process.cwd() + path.sep + 'data';
    }
    logRequest(name, date, status, processInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new ProcessedLogFileManager_1.ProcessLogFileManager(name).writeLog(new ProcessedRequest_1.ProcessedRequest(date, status, processInfo.request, processInfo.response, processInfo.matches));
            return true;
        });
    }
    getProcessedRequests(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new ProcessedLogFileManager_1.ProcessLogFileManager(name).getLogs();
        });
    }
    getProcessedRequest(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new ProcessedLogFileManager_1.ProcessLogFileManager(name).getLog(id);
        });
    }
    clearProcessedRequests(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new ProcessedLogFileManager_1.ProcessLogFileManager(name).clearLogs();
            return true;
        });
    }
}
exports.ServicesFileProvider = ServicesFileProvider;
