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
const ProcessedRequest_1 = require("../model/ProcessedRequest");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
var debug = require('debug')('processLogFileManager');
var lastCount = 1;
class ProcessLogFileManager {
    constructor(name) {
        this.name = name;
    }
    getLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var searchPath = this.getLogDirectory() + '/*.log';
                debug('search path:' + searchPath);
                var self = this;
                glob(searchPath, {}, function (err, files) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            debug('error enumerating:' + err);
                            reject(err);
                        }
                        else {
                            try {
                                var requests = [];
                                files.forEach(file => {
                                    requests.push(self.parseLogFileSync(file));
                                });
                                resolve(requests);
                            }
                            catch (error) {
                                reject(error);
                            }
                        }
                    });
                });
            });
        });
    }
    getLog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let logFile = this.getLogDirectory() + path.sep + id;
                    if (fs.existsSync(logFile)) {
                        resolve(this.parseLogFileSync(logFile));
                    }
                    else {
                        resolve(undefined);
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    clearLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    var searchPath = this.getLogDirectory() + '/*.log';
                    glob(searchPath, {}, function (err, files) {
                        return __awaiter(this, void 0, void 0, function* () {
                            files.forEach(fs.unlinkSync);
                        });
                    });
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    writeLog(processRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    this.writeLogSync(processRequest);
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    writeLogSync(processRequest) {
        debug('writing logs');
        var logDirectory = this.getLogDirectory();
        debug('logDirectory:' + logDirectory);
        if (!fs.existsSync(logDirectory)) {
            debug('log directory ' + logDirectory + ' does not exists and hence not writing');
        }
        debug('checking for available log file name.');
        var logFile = this.getAvailableLog(logDirectory);
        var data = processRequest.date.toString();
        data += "\r\n";
        data += "\r\n";
        data += "------- BEGIN STATUS  -----------\r\n";
        data += processRequest.status;
        data += "\r\n";
        data += "------- END STATUS -----------\r\n";
        data += "\r\n";
        data += "------- BEGIN MATCHES  -----------\r\n";
        if (processRequest.matches !== undefined) {
            data += processRequest.matches.join();
        }
        data += "\r\n";
        data += "------- END MATCHES -----------\r\n";
        data += "\r\n";
        data += "------- BEGIN REQUEST -----------\r\n";
        data += processRequest.request;
        data += "\r\n";
        data += "------- END REQUEST -----------\r\n";
        data += "\r\n";
        data += "------- BEGIN RESPONSE -----------\r\n";
        data += processRequest.response;
        data += "\r\n";
        data += "------- END RESPONSE -----------\r\n";
        debug('writing to :' + logFile);
        fs.writeFileSync(logFile, data);
    }
    getAvailableLog(parent) {
        var fileName = parent.toString() + path.sep + lastCount.toString() + '.log';
        lastCount = lastCount + 1;
        if (lastCount > 10) {
            lastCount = 1;
        }
        return fileName;
    }
    getLogDirectory() {
        return process.cwd() + path.sep + 'data' + path.sep + this.name + path.sep + 'logs';
    }
    parseLogFileSync(file) {
        var data = fs.readFileSync(file, 'utf-8');
        var request = '';
        var response = '';
        var matches;
        var requestStarted;
        var responseStarted;
        var matchStarted;
        var firstLine = true;
        var date;
        data.split('\r\n').forEach(line => {
            if (firstLine) {
                date = new Date(Date.parse(line));
                firstLine = false;
            }
            if (line.includes('END REQUEST')) {
                requestStarted = false;
            }
            else if (line.includes('END RESPONSE')) {
                responseStarted = false;
            }
            else if (line.includes('END MATCHES')) {
                matchStarted = false;
            }
            if (requestStarted) {
                request += line;
            }
            else if (responseStarted) {
                response += line;
            }
            else if (matchStarted) {
                matches = line.split(',');
            }
            if (line.includes('BEGIN REQUEST')) {
                requestStarted = true;
            }
            else if (line.includes('BEGIN RESPONSE')) {
                responseStarted = true;
            }
            else if (line.includes('BEGIN MATCHES')) {
                matchStarted = true;
            }
        });
        var processedRequest = new ProcessedRequest_1.ProcessedRequest(date, 0, request, response, matches);
        // file comes with either '/' or with '\'
        processedRequest.id = file.split(path.sep).slice(-1)[0].split('/').slice(-1)[0];
        return processedRequest;
    }
}
exports.ProcessLogFileManager = ProcessLogFileManager;
