import { Consumer } from "./consumer/Consumer";
import { Provider } from "./provider/Provider";
import { FileProvider } from "./provider/FileProvider";
import { InMemoryProvider } from "./provider/InMemoryProvider";
import { FileConsumer } from "./consumer/FileConsumer";
import { MongoDbConsumer } from "./consumer/MongoDb";

export class Options {
    private provider: Provider
    private consumer: Consumer
    constructor(public args: string[]) {
    }

    public getConsumer(): Consumer {
        return this.consumer
    }

    public getProvider(): Provider {
        return this.provider
    }

    public parse(): number {
        var options = require('minimist')(process.argv.slice(2));
        if (options.provider === undefined || options.consumer === undefined) {
            this.printUsage()
            return -1
        }

        let result = this.setProvider(options)
        if (result !== 0) {
            return result
        }

        result = this.setConsumer(options)
        if (result !== 0) {
            return result
        }

        return 0
    }

    private setProvider(options): number {
        switch (options.provider) {
            case 'file':
                if (options.providerpath === undefined) {
                    console.error('provider file requires providerpath')
                    this.printUsage()
                    return -10
                }
                this.provider = new FileProvider(options.providerpath)
                break
            case 'inmemory':
                if (options.providerpath === undefined) {
                    console.error('provider inmemory requires jsonfile')
                    this.printUsage()
                    return -11
                }
                this.provider = new InMemoryProvider(options.providerpath)
                break
            default:
                console.error(`invalid provider ${options.provider}`)
                return -12
        }

        return 0
    }

    private setConsumer(options): number {
        switch (options.consumer) {
            case 'file':
                if (options.consumerpath === undefined) {
                    console.error('consumer file requires consumerpath')
                    this.printUsage()
                    return -20
                }
                this.consumer = new FileConsumer(options.consumerpath)
                break
            case 'mongo':
                if (options.consumermongodb === undefined) {
                    console.error('consumer mongo requires consumermongodb')
                    this.printUsage()
                    return -21
                }
                this.consumer = new MongoDbConsumer(options.consumermongodb)
                break
            default:
                console.error(`invalid consumer ${options.consumer}`)
                return -22
        }

        return 0
    }
    private printUsage() {
        console.log(`Usage --provider file|inmemory --consumer file|mongo --providerfilepath path --consumerfilepath path --consumermongodb mongodbconnection`)
    }
}