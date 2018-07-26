import { resolve } from "url";
import * as handlebars from 'handlebars'
import * as dateformat from 'dateformat'

export class ResponseTransformer {

    constructor() {

        handlebars.registerHelper('date', function (context) {

            var format = 'yyyy-MM-dd'
            if( context.hash["format"]){
                format = context.hash['format']
            }
            var days = 0
            if( context.hash['days']){
                days = +context.hash['days']
            }
       
            var date = new Date();
            var newDate = date.setDate(date.getDate() + days);
            var formattedDate = dateformat(newDate, format)
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