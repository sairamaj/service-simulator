import { Log } from "../model/Log";

export class LogManager {
    public static Logs: Log[] = []
    public static ErrorLogs: Log[] = []
    public static LogLimit = 50;
    public static TrimSize = 10;
    public static async log(type: string, message: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (type === 'error') {
                this.ErrorLogs.push(new Log(type, message))
                if (this.ErrorLogs.length > this.LogLimit) {
                    this.ErrorLogs = LogManager.ErrorLogs.slice(this.TrimSize)
                }
            } else {
                this.Logs.push(new Log(type, message))
                if (this.Logs.length > this.LogLimit) {
                    this.Logs = LogManager.Logs.slice(this.TrimSize)
                }
            }
            resolve()
        })
    }

    public static async getLogs(): Promise<Log[]> {
        return new Promise<Log[]>((resolve, reject) => {
            resolve(this.ErrorLogs.concat(this.Logs))
        })
    }
}