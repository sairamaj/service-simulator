import { ProcessedRequest } from "../model/ProcessedRequest";

export class LoggerIntance {
    private static instance: LoggerIntance;
    private Logs: ProcessedRequest[] = []
    static getInstance() {
        if (!LoggerIntance.instance) {
            LoggerIntance.instance = new LoggerIntance();
            // ... any one time initialization goes here ...
        }
        return LoggerIntance.instance;
    }

    public getLogs(): ProcessedRequest[] {
        return this.Logs;
    }

    public clear() {
        this.Logs = []
    }

    public add(log: ProcessedRequest) {
        this.Logs.push(log);
    }
}