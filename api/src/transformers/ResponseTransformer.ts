import { resolve } from "url";
import * as handlebars from 'handlebars'
import { HelperProvider } from "./HelpersProvider";
var debug = require('debug')('responsetransformer')

export class ResponseTransformer {

    constructor() {

        for (let [k, v] of HelperProvider.getHelpers()) {
            handlebars.registerHelper(k, v);
        }
    }

    public async transform(request: string, response: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var template = handlebars.compile(response)
            try {
                resolve(template(request))
            } catch (error) {
                reject(error)
            }
        })
    }
}