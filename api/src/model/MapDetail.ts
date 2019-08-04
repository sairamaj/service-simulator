export class MapDetail {
    constructor(
        public name: string,
        public type: string,
        public request: string,
        public response: string,
        public matches: string[],
    ) {
    }
}
