export class ProcessedRequest {
    public dateString:string
    constructor(
        public id: string,
        public date: Date,
        public matches: string,
        public file: string,
        public request: string,
        public response: string,
    ) {
    }
}