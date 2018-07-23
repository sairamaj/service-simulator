export class SimulatedResponseData {
    constructor(
        public name: string,
        public request: string,
        public response: string,
        public matchString:string,
        public matches: string[]) {
    }
}