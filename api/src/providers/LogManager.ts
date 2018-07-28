import { Log } from "../model/Log";

export class LogManager {
    public static Logs: Log[] = []
    public static async log(type: string, message: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            LogManager.Logs.push(new Log(type, message))
            resolve()
        })
    }

    public static async getLogs(): Promise<Log[]> {
        return new Promise<Log[]>((resolve, reject) => {
            resolve(LogManager.Logs)
        })

    }
}