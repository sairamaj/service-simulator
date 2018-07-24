export class ServiceConfigMap {
    public response: string;
    constructor(
        public name: string,
        public matches: string[],
    ) {
    }
}
