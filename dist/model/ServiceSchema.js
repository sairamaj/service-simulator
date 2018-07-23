"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
