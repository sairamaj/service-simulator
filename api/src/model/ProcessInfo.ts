export class ProcessInfo {
    constructor(
        public request: string
    ) {
    }

    public response: string
    public responseBuffer: Buffer
    public name: string
    public matches: string[]
    public type: string
    public sleep: number
    public responseType: string

    public getResponseContentType() : string{
        if (this.responseType.length !== 0){
            if( this.responseType === 'binary'){
                return 'image/jpeg'         // need to read from map.config
            }
        }
        if( this.type === 'json'){
            return 'application/json'
        }

        return 'text/xml; charset=utf-8'
    }
}