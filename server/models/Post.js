const mongoose = require('mongoose')
const Schema = require('mongoose')

const postSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    },
    filePath: {
        type: String
    },
    category: {
        type: Number
    }
}, { timestamps: true })



const Post = mongoose.model('Post', postSchema)
module.exports = { Post }

