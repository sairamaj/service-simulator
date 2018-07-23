"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.ServiceSchema = new Schema({
    name: {
        type: String,
        required: 'Name required'
    },
    config: [{
            name: {
                type: String,
                required: 'Config.name required'
            },
            matches: [
                {
                    type: String
                }
            ]
        }
    ]
});
