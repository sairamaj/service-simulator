"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.RequestSchema = new Schema({
    name: {
        type: String,
        required: 'Name required'
    },
    request: {
        type: String
    }
});
