import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const ResponseSchema = new Schema({
    name: {
        type: String,
        required: 'Name required',
        index: {
            unique: true,
            dropDups: true
        }
    },

    response: {
        type: String
    },
});