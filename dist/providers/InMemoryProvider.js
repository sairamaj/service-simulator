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
const ProcessInfo_1 = require("../model/ProcessInfo");
const ProcessedRequest_1 = require("../model/ProcessedRequest");
const MapDetail_1 = require("../model/MapDetail");
const debug = require('debug')('inmemoryprovider');
class LoggerIntance {
    constructor() {
        this.Logs = [];
    }
    static getInstance() {
        if (!LoggerIntance.instance) {
            LoggerIntance.instance = new LoggerIntance();
            // ... any one time initialization goes here ...
        }
        return LoggerIntance.instance;
    }
    getLogs() {
        return this.Logs;
    }
    clear() {
        this.Logs = [];
    }
    add(log) {
        this.Logs.push(log);
    }
}
class InMemoryProvider {
    constructor() {
        this.TestData = require('../../testdata/testdata1');
    }
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                resolve(this.TestData);
            });
        });
    }
    getService(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var services = yield this.getServices();
            return services.find(h => h.name == name);
        });
    }
    getMapDetail(name, mapName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                var service = this.TestData.find(s => s.name === name);
                if (service === undefined) {
                    resolve(undefined);
                }
                var mapInfo = service.config.find(c => c.name === mapName);
                if (mapInfo === undefined) {
                    resolve(undefined);
                }
                var mapDetail = new MapDetail_1.MapDetail(mapInfo.name, mapInfo.request, mapInfo.response, mapInfo.matches);
                resolve(mapDetail);
            });
        });
    }
    getResponse(name, request) {
        return __awaiter(this, void 0, void 0, function* () {
            var service = yield this.getService(name);
            if (service === undefined || service.config === undefined) {
                debug('warn: ' + name + ' not found.');
                return undefined;
            }
            var foundConfig = service.config.find(c => {
                if (c.matches === undefined) {
                    return false;
                }
                return c.matches.every(m => request.includes(m));
            });
            if (foundConfig === undefined) {
                debug('warn: matching not found.');
                return undefined;
            }
            debug('foundConfig:' + JSON.stringify(foundConfig));
            var processInfo = new ProcessInfo_1.ProcessInfo(request);
            processInfo.matches = foundConfig.matches;
            processInfo.response = foundConfig.response;
            return processInfo;
        });
    }
    logRequest(name, date, status, processInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('logRequest.enter');
            return new Promise((resolve) => {
                LoggerIntance.getInstance().add(new ProcessedRequest_1.ProcessedRequest(date, status, processInfo.request, processInfo.response, processInfo.matches));
                resolve(true);
            });
        });
    }
    getProcessedRequests(name) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getProcessedRequests.enter');
            return new Promise((resolve) => {
                var counter = 0;
                var logs = LoggerIntance.getInstance().getLogs();
                logs.forEach(l => {
                    counter++;
                    l.id = counter.toString();
                });
                resolve(logs);
            });
        });
    }
    getProcessedRequest(name, id) {
        debug('enter getProcessedRequest: ' + id);
        return new Promise((resolve, reject) => {
            var logs = LoggerIntance.getInstance().getLogs();
            debug('logs length' + logs.length);
            try {
                let index = +id - 1;
                if (logs.length >= index) {
                    debug('returning log');
                    resolve(logs[index]);
                }
                else {
                    resolve(undefined);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    clearProcessedRequests(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                LoggerIntance.getInstance().clear();
                resolve(true);
            });
        });
    }
}
exports.InMemoryProvider = InMemoryProvider;
