import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const ServiceSchema = new Schema({
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