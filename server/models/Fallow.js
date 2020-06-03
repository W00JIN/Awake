const mongoose = require('mongoose')
const Schema = require('mongoose')

const fallowSchema = mongoose.Schema({
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



const Fallow = mongoose.model('Fallow', fallowSchema)
module.exports = { Fallow }

