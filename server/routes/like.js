const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");

//=================================
//             Like
//=================================


router.post('/likeInfo', (req, res) => {
  Like.findOne({ "postID": req.body.postID, "userID" : req.body.userID })
    .exec((err, like) => {
      if (!like) return res.status(200).json({ success: false, like })
      res.status(200).json({ success: true, like })
    })
});

router.post('/getLikes', (req, res) => {
  Like.find({ "postID": req.body.postID })
    .populate('userID')
    .exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes })
    })
});

router.post('/like', (req, res) => {

    const like = new Like(req.body)
    like.save((err) => {
      if (err) return res.json({ success: false, err })
      
      return res.status(200).json({
        success: true,
        message: "successfully like the post"
      })
    });

});

router.post('/unlike', (req, res) => {

  Like.findOneAndDelete({ "userID": req.body.userID, "postID": req.body.postID})
    .exec((err, ) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true })
    })

});

module.exports = router;