import { ServiceConfigMap } from './ServiceConfigMap';

export class Service {
    constructor(public name: string,
        public type: string,
        public url: string,
        public config: ServiceConfigMap[]
    ) {
    }
}
