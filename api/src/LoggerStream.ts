import { LogManager } from "./providers/LogManager";
require('./string.extensions')

var stream = require('stream');
var util = require('util');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

export class EchoStream extends stream.Writable {
    public write(chunk: string ) {
        console.log(chunk);
        this.Log(chunk)
    }

    private async Log(message:string) : Promise<void>{
        // color codes are there in the messages as they are used for console.
        message = message.replaceAll('\x1b\\[0m','')
        message = message.replaceAll('\x1b\\[32m','')
        await LogManager.log('status', message)
    }
}