export class SimulatedResponseData {
    constructor(
        public name: string,
        public requestFileName: string,
        public request: string,
        public responseFileName: string,
        public response: string,
        public matchString:string,
        public matches: string[]) {
    }
}