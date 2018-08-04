export class ProcessInfo {
    constructor(
        public request: string
    ) {
    }

    public response: string
    public matches: string[]
    public type: string

    public getResponseContentType() : string{
        if( this.type === 'json'){
            return 'application/json'
        }

        return 'text/xml; charset=utf-8'
    }
}