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
const path = require("path");
const fs = require("fs");
const ProcessInfo_1 = require("../model/ProcessInfo");
const MapDetail_1 = require("../model/MapDetail");
var debug = require('debug')('servicefileprovider');
class ServiceFileProvider {
    constructor(name) {
        this.name = name;
        this.configMaps = [];
        var mapFileName = this.getConfigMapFile();
        if (!fs.existsSync(mapFileName)) {
            debug('warn: map file name does not exists:' + mapFileName);
            return;
        }
        this.configMaps = JSON.parse(fs.readFileSync(mapFileName, 'utf-8'));
    }
    getMapDetail(mapName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var foundMap = this.configMaps.find(m => m.name == mapName);
                if (foundMap === undefined) {
                    resolve(undefined);
                }
                var response = '';
                var responseFileName = this.getResponseFileName(foundMap.name);
                if (fs.existsSync(responseFileName)) {
                    response = fs.readFileSync(responseFileName, 'utf-8');
                }
                var request = '';
                var requestFileName = this.getRequestFileName(foundMap.name);
                if (fs.existsSync(requestFileName)) {
                    request = fs.readFileSync(requestFileName, 'utf-8');
                }
                resolve(new MapDetail_1.MapDetail(foundMap.name, request, response, foundMap.matches));
            });
        });
    }
    getResponse(request) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter:getResponse');
            debug('getResponse: finding map.');
            var foundConfig = this.configMaps.find(c => {
                if (c.matches === undefined) {
                    return false;
                }
                return c.matches.every(m => request.includes(m));
            });
            debug('getResponse:foundConfig:' + foundConfig);
            if (foundConfig === undefined) {
                debug('warn:getResponse map not found');
                return undefined;
            }
            var responseFileName = this.getResponseFileName(foundConfig.name);
            return new Promise((resolve, reject) => {
                debug('getResponse: reading file:' + responseFileName);
                if (!fs.existsSync(responseFileName)) {
                    resolve(undefined);
                    return;
                }
                return fs.readFile(responseFileName, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        var processInfo = new ProcessInfo_1.ProcessInfo(request);
                        processInfo.response = data;
                        processInfo.matches = foundConfig.matches;
                        resolve(processInfo);
                    }
                });
            });
        });
    }
    getConfigMap() {
        let configFile = this.getConfigMapFile();
        if (fs.existsSync(configFile)) {
            return require(configFile);
        }
    }
    logRequest(date, status, processInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                resolve(true);
            });
        });
    }
    getProcessedRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                resolve([]);
            });
        });
    }
    clearProcessedRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                resolve(true);
            });
        });
    }
    getDataDirectory() {
        return process.cwd() + path.sep + 'data';
    }
    getServiceDirectory() {
        return process.cwd() + path.sep + 'data' + path.sep + this.name;
    }
    getServiceResponseDirectory() {
        return this.getDataDirectory() + path.sep + this.name + path.sep + 'responses';
    }
    getServiceRequestDirectory() {
        return this.getDataDirectory() + path.sep + this.name + path.sep + 'requests';
    }
    getResponseFileName(requestName) {
        return this.getServiceResponseDirectory() + path.sep + requestName + '.xml';
    }
    getRequestFileName(requestName) {
        return this.getServiceRequestDirectory() + path.sep + requestName + '.xml';
    }
    getConfigMapDirectory(serviceName) {
        return this.getServiceDirectory() + path.sep + 'config';
    }
    getConfigMapFile() {
        return this.getConfigMapDirectory(this.name) + path.sep + 'map.json';
    }
}
exports.ServiceFileProvider = ServiceFileProvider;
