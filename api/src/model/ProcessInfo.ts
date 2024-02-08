export class ProcessInfo {
    constructor(
        public request: string
    ) {
    }

    public response: string
    public name: string
    public matches: string[]
    public type: string
    public sleep: number
    public binary: boolean

    public getResponseContentType() : string{
        if( this.type === 'json'){
            return 'application/json'
        }
        
        if( this.type === 'xml'){
            return 'text/xml; charset=utf-8'
        }

        return 'application/soap+xml; charset=utf-8'
    }
}
