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

        handlebars.registerHelper('random', function (context) {

            var min = 0
            if( context.hash["min"]){
                min = context.hash['min']
            }
            var max = 1000000
            if( context.hash['max']){
                max = context.hash['max']
            }
       
            var val = Math.floor(Math.random() * max) + min
            return val;    
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