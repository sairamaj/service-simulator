"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var glob = require("glob");
var path = require("path");
var fs = require("fs");
var mongoose = require("mongoose");
var ServiceSchema_1 = require("../src/model/ServiceSchema");
var ResponseSchema_1 = require("../src/model/ResponseSchema");
var RequestSchema_1 = require("../src/model/RequestSchema");
var ServiceDbSchema = mongoose.model('services', ServiceSchema_1.ServiceSchema);
var ResponseDbSchema = mongoose.model('responses', ResponseSchema_1.ResponseSchema);
var RequestDbSchema = mongoose.model('requests', RequestSchema_1.RequestSchema);
var ServiceConfigMap = /** @class */ (function () {
    function ServiceConfigMap(name, matches) {
        this.name = name;
        this.matches = matches;
    }
    return ServiceConfigMap;
}());
exports.ServiceConfigMap = ServiceConfigMap;
var Service = /** @class */ (function () {
    function Service(name, path, config) {
        this.name = name;
        this.path = path;
        this.config = config;
    }
    return Service;
}());
var ImportService = /** @class */ (function () {
    function ImportService(path, mongoUrl) {
        this.path = path;
        this.mongoUrl = mongoUrl;
        this.mongoSetup();
    }
    ImportService.prototype.mongoSetup = function () {
        mongoose.Promise = global.Promise;
        console.log('connecting...');
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        console.log('connected...');
    };
    ImportService.prototype["import"] = function () {
        return __awaiter(this, void 0, void 0, function () {
            var services, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getServices()];
                    case 1:
                        services = _a.sent();
                        data = this.createServicesCollectionInfo(services);
                        console.log('inserting services...');
                        return [4 /*yield*/, ServiceDbSchema.collection.insertMany(data, function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log('success:' + result.insertedCount);
                                }
                            })];
                    case 2:
                        _a.sent();
                        console.log('inserting responses...');
                        services.forEach(function (s) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                s.config.forEach(function (c) { return __awaiter(_this, void 0, void 0, function () {
                                    var responseNameKey, responseFileName;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                responseNameKey = s.name + "_response_" + c.name;
                                                responseFileName = s.path + path.sep + 'responses' + path.sep + c.name + '.xml';
                                                return [4 /*yield*/, this.insertResponse(responseNameKey, responseFileName)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); });
                        console.log('inserting requests...');
                        services.forEach(function (s) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                s.config.forEach(function (c) { return __awaiter(_this, void 0, void 0, function () {
                                    var requestNameKey, requestFileName;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                requestNameKey = s.name + "_request_" + c.name;
                                                requestFileName = s.path + path.sep + 'requests' + path.sep + c.name + '.xml';
                                                console.log(requestFileName);
                                                return [4 /*yield*/, this.insertRequest(requestNameKey, requestFileName)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportService.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ServiceDbSchema.collection.remove({}, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('clear services success:');
                    }
                });
                ResponseDbSchema.collection.remove({}, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('clear responses success:');
                    }
                });
                RequestDbSchema.collection.remove({}, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('clear requests success:');
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ImportService.prototype.getServices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        glob(_this.path + '/*', function (err, dirs) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(dirs.map(function (d) {
                                    var mapFile = d + path.sep + 'config' + path.sep + 'map.json';
                                    return new Service(d.split('/').slice(-1)[0], d, JSON.parse(fs.readFileSync(mapFile, 'utf-8')));
                                }));
                            }
                        });
                    })];
            });
        });
    };
    ImportService.prototype.createServicesCollectionInfo = function (services) {
        var data = [];
        services.forEach(function (s) {
            data.push({
                name: s.name,
                config: s.config
            });
        });
        return data;
    };
    ImportService.prototype.insertResponse = function (name, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fs.existsSync(fileName)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fs.readFile(fileName, 'utf-8', function (err, data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!err) return [3 /*break*/, 1];
                                            console.log('err:' + err);
                                            return [3 /*break*/, 3];
                                        case 1: return [4 /*yield*/, ResponseDbSchema.collection.insertOne({ name: name, response: data }, function (err, result) {
                                                if (err) {
                                                    console.log('error for:' + name);
                                                }
                                                else {
                                                    console.log('success for:' + name);
                                                }
                                            })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportService.prototype.insertRequest = function (name, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fs.existsSync(fileName)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fs.readFile(fileName, 'utf-8', function (err, data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!err) return [3 /*break*/, 1];
                                            console.log('err:' + err);
                                            return [3 /*break*/, 3];
                                        case 1:
                                            console.log('request insert:' + name);
                                            return [4 /*yield*/, RequestDbSchema.collection.insertOne({ name: name, request: data }, function (err, result) {
                                                    if (err) {
                                                        console.log('error for:' + name);
                                                    }
                                                    else {
                                                        console.log('success for:' + name);
                                                    }
                                                })];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ImportService;
}());
for (var j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
}
if (process.argv.length < 3) {
    console.error('data path required.');
    process.exit(-1);
}
if (process.argv.length < 4) {
    console.error('mongo conection string required.');
    process.exit(-1);
}
var dataPath = process.argv[2];
var mongodb = process.argv[3];
console.log('importing:' + dataPath);
var importService = new ImportService(dataPath, mongodb);
function clearAndImport() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('clearing...');
                    return [4 /*yield*/, importService.clear()];
                case 1:
                    _a.sent();
                    console.log('importing...');
                    return [4 /*yield*/, importService["import"]()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
clearAndImport()
    .then(function (result) {
    console.log('final success');
})["catch"](function (err) {
    console.log('final:' + err);
});
