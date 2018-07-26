import { resolve } from "url";
import * as handlebars from 'handlebars'
import * as dateformat from 'dateformat'

export class ResponseTransformer {

    constructor() {
        handlebars.registerHelper('date', function (format, days) {
            console.log('>>>>>in date')
            var date = new Date();
            var newDate = date.setDate(date.getDate());
            var formattedDate = dateformat(newDate, 'yyyy-MM-dd')
            console.log('>>> formated date:' + formattedDate)
            return formattedDate;
        });

    }

    public async transform(data: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var template = handlebars.compile(data)
            try {
                resolve(template(context))
            } catch (error) {
                reject(error)
            }
        })
    }
}