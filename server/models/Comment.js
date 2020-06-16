const mongoose = require('mongoose')
const Schema = require('mongoose')

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postID: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: {
        type: String
    }
}, { timestamps: true })



const Comment = mongoose.model('Comment', commentSchema)
module.exports = { Comment }

