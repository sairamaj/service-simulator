export class ServedRequests {
    public dateString:string
    constructor(
        public date: Date,
        public matches: string,
        public file: string,
        public request: string,
        public response: string,
    ) {
    }
}