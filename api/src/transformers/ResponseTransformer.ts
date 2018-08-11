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

    public async transform(request: string, response: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var template = handlebars.compile(response)
            try {
                resolve(template({
                    request : request,
                    dataProvider: this.dataProvider
                }))
            } catch (error) {
                reject(error)
            }
        })
    }
}