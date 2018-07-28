import { LogManager } from "./providers/LogManager";
require('./string')
//import * as from './string.extensions'


var stream = require('stream');
var util = require('util');

export class LoggerStream extends stream.Writable {
    public write(chunk: string ) {
        console.log(chunk);
        this.Log(chunk)
    }

    private async Log(message:string) : Promise<void>{
        // color codes are there in the messages as they are used for console.
     //   message = message.replaceAll('\x1b\\[0m','')
     //   message = message.replaceAll('\x1b\\[32m','')
        await LogManager.log('status', message)
    }
}