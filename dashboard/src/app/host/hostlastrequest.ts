export class HostLastRequest{
    constructor(
        public date: Date,
        public request: string,
        public response?: string,
        public error? : string
    ){
    }
}