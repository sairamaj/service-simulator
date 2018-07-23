"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.ResponseSchema = new Schema({
    name: {
        type: String,
        required: 'Name required'
    },
    response: {
        type: String
    }
});
