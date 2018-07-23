"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.RequestSchema = new Schema({
    name: {
        type: String,
        required: 'Name required'
    },
    request: {
        type: String
    },
});
