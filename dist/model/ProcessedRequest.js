"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessedRequest {
    constructor(date, status, request, response, matches) {
        this.date = date;
        this.status = status;
        this.request = request;
        this.response = response;
        this.matches = matches;
    }
}
exports.ProcessedRequest = ProcessedRequest;
