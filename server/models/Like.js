const mongoose = require('mongoose')
const Schema = require('mongoose')

const likeSchema = mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postID: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
}, { timestamps: true })


const Like = mongoose.model('Like', likeSchema)
module.exports = { Like }
