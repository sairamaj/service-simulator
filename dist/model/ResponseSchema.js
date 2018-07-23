"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ResponseSchema = new Schema({
    name: {
        type: String,
        required: 'Name required'
    },
    response: {
        type: String
    },
});
