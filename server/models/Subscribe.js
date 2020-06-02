const mongoose = require('mongoose')
const Schema = require('mongoose')

const subscribeSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Number
    }
}, { timestamps: true })



const Subscribe = mongoose.model('Subscribe', subscribeSchema)
module.exports = { Subscribe }

