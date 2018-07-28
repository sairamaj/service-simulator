export class Log {
    constructor(public type: string, public message: string) {
        this.date = new Date()
    }
    public date: Date
}