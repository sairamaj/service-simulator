import { ServiceConfigMap } from './ServiceConfigMap';

export class Service {
    constructor(public name: string,
        public config: ServiceConfigMap[]
    ) {
    }
}
