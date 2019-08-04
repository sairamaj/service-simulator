export class ServiceConfigMap {
    public response: string;
    constructor(
        public name: string,
        public type: string,
        public sleep: number,
        public matches: string[],
    ) {
    }
}
