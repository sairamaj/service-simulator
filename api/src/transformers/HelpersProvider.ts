import * as dateformat from 'dateformat'
var debug = require('debug')('handlebarhelpers')

export class HelperProvider {

    private static extract(input: string, start: string, end: string) {
        if (input === undefined || start === undefined || end === undefined) {
            return ''
        }

        var pos1 = input.indexOf(start)
        if (pos1 > 0) {
            console.log(pos1)
            var pos2 = input.indexOf(end, pos1 + 1);
            if (pos2 > 0) {
                return input.substr(pos1 + start.length, pos2 - pos1 - start.length)
            }
        }
        return ''
    }

    static getHelpers(): Map<string, any> {
        let map = new Map<string, any>();

        map.set('random',function (context) {
            debug('enter random helper')
            var min = 0
            if (context.hash["min"]) {
                min = context.hash['min']
            }
            var max = 1000000
            if (context.hash['max']) {
                max = context.hash['max']
            }

            var val = Math.floor(Math.random() * max) + min
            return val;
        })

        map.set('date', function (context) {
            debug('enter date helper')
            var format = 'yyyy-MM-dd'
            if (context.hash["format"]) {
                format = context.hash['format']
            }
            var days = 0
            if (context.hash['days']) {
                days = +context.hash['days']
            }

            var date = new Date();
            var newDate = date.setDate(date.getDate() + days);
            var formattedDate = dateformat(newDate, format)
            return formattedDate;
        })

        
        map.set('request', function (context) {
            debug('enter request helper')

            if (context.hash['tags'] === undefined) {
                debug('no tags found in context.')
                return ''
            }

            var tags = context.hash['tags']
            var [start, end] = tags.split('|')

            debug(`in request processor start: ${start}  end:${end}.`)
            if (start === undefined || end === undefined) {
                return ''
            }

            return HelperProvider.extract(context.data.root, start, end)
        })
        
        return map
    }
}