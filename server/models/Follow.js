const mongoose = require('mongoose')
const Schema = require('mongoose')

const followSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId
    }
}, { timestamps: true })



const Follow = mongoose.model('Follow', followSchema)
module.exports = { Follow }

