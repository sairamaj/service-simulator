export class MapDetail {
    constructor(
        public name: string,
        public request: string,
        public response: string,
        public method: string,
        public matches: string[],
        public script: string
    ) {
        if( method == null || method.length == 0){
            this.method = "post"
        }
    }
}

