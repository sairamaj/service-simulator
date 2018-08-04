export class ProcessInfo {
    constructor(
        public request: string
    ) {
    }

    public response: string
    public matches: string[]
    public contentType: string

    public getResponseContentType() : string{
        if( this.contentType === 'json'){
            return 'application/json'
        }

        return 'text/xml; charset=utf-8'
    }
}