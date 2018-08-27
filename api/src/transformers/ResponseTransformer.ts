    import { resolve } from "url";
import * as handlebars from 'handlebars'
import { HelperProvider } from "./HelpersProvider";
import { ITemplateDataProvider } from "../providers/ITemplateDataProvider";
var debug = require('debug')('responsetransformer')

export class ResponseTransformer {

    constructor(public dataProvider: ITemplateDataProvider) {
        for (let [k, v] of HelperProvider.getHelpers()) {
            handlebars.registerHelper(k, v);
        }
    }

    public async transform(serviceName : string, request: string, response: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var template = handlebars.compile(response)
            try {
                resolve(template({
                    request : request,
                    serviceName : serviceName,
                    dataProvider: this.dataProvider
                }))
            } catch (error) {
                debug('transform:' + error)
                reject(error)
            }
        })
    }
}