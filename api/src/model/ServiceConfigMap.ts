export class ServiceConfigMap {
    public response: string;
    constructor(
        public name: string,
        public sleep: number,
        public matches: string[],
    ) {
    }
}
