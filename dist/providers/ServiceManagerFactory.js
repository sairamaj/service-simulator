"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InMemoryProvider_1 = require("./InMemoryProvider");
const ServicesFileProvicer_1 = require("./ServicesFileProvicer");
const MongoDbProvider_1 = require("./MongoDbProvider");
var debug = require('debug')('servicemanagerfactory');
const config = require('./../config');
var ServiceManagerFactory;
(function (ServiceManagerFactory) {
    function createServiceManager() {
        debug('enter createServiceManager:' + config.app.provider);
        if (config.app.provider === 'file') {
            return new ServicesFileProvicer_1.ServicesFileProvider();
        }
        else if (config.app.provider === 'mongo') {
            return new MongoDbProvider_1.MongoDbProvider();
        }
        return new InMemoryProvider_1.InMemoryProvider();
    }
    ServiceManagerFactory.createServiceManager = createServiceManager;
})(ServiceManagerFactory = exports.ServiceManagerFactory || (exports.ServiceManagerFactory = {}));
