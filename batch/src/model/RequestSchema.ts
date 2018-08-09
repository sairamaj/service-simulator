import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const RequestSchema = new Schema({
    name: {
        type: String,
        required: 'Name required',
        index: {
            unique: true,
            dropDups: true,
            uniqueCaseInsensitive: true 
        }
    },

    request: {
        type: String
    },
});