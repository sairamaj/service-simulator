// config.js
const env = process.env.NODE_ENV || "dev"; // 'dev' or 'prod' or 'azure'

const dev = {
    app: {
        port: process.env.PORT || 3000 ,
        provider: process.env.PROVIDER || 'inmemory',
        mongoDbConnection: process.env.MONGODB_CONNECTION
    }
};

const prod = {
    app: {
        port: process.env.PORT || 3000,
        provider: process.env.PROVIDER || 'file',
        mongoDbConnection: process.env.MONGODB_CONNECTION
    }
};

const azure = {
    app: {
        port: process.env.PORT || 80,
        provider: process.env.PROVIDER || 'mongo',
        mongoDbConnection: process.env.MONGODB_CONNECTION
    },
};

const config = {
    dev,
    prod,
    azure
};

function getConfig() {
    var current = config[env];
    if (current === undefined) {
        console.error('envionrment not set. please set NODE_ENV with one of (dev/prod/azureprod)')
        process.exit(-99)
    }
    
    if( current.app.provider == undefined){
        console.log('Provider was not set.please set by PROVIDER environment ( inmemory,file,mongo)')
        process.exit(-98)
    }

    if( current.app.provider == 'mongo'){
        if( current.app.mongoDbConnection === undefined || current.app.mongoDbConnection.length === 0){
            console.error('provider is mongo but no connection string was specified. specify MONGODB_CONNECTION environment variable.')
            process.exit(-97)
        }
    }

    return current;
}
module.exports = getConfig()