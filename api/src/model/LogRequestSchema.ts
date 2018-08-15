import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const LogRequestSchema = new Schema({
    name: {
        type: String,
        required: 'Name required'
    },

    date: {
        type: Date,
        required: 'Date required'
    },

    status: {
        type: String,
        required: 'status required'
    },

    request: {
        type: String,
    },

    response: {
        type: String,
    },

    matches: {
        type: String,
    }
},{ capped: { size: 1024*1024, max: 200, autoIndexId: true } });
