const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");


//=================================
//             Comment
//=================================


router.post('/getComments', (req, res) => {
  Comment.find({ "postID": req.body.postID })
    .populate('writer')
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments })
    })
});

router.post('/saveComment', (req, res) => {

    const comment = new Comment(req.body)

    if( !req.body.writer || !req.body.commentTo || !req.body.postID || !req.body.content ){
      return res.json({ success: false, message:"there is empty blank" })
    }

    comment.save((err) => {
      if (err) return res.json({ success: false, err })
      
      return res.status(200).json({
        success: true,
        message: "successfully save comment"
      })
    });

});

module.exports = router;