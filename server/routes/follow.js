const express = require('express');
const router = express.Router();

const { Follow } = require("../models/Follow");


//=================================
//             Follow
//=================================



router.post('/FollowInfo', (req, res) => {
  //DB에 카테고리 추가
  Follow.findOne({ "userTo": req.body.userTo, "userFrom": req.body.userFrom, "category": req.body.category })
    .exec((err, Follow) => {
      if (!Follow) return res.status(200).json({ success: false })
      res.status(200).json({ success: true, Follow })
    })

});

router.post('/Follow', (req, res) => {
  //DB에 Follow 정보 저장
  //console.log(req.body)
  const follow = new Follow(req.body)
  follow.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })

    //status 200 = success
    return res.status(200).json({
      success: true,
      message: "successfully added categoty"
    })
  });

});

router.post('/unFollow', (req, res) => {
  Follow.findOneAndDelete({ "userTo": req.body.userTo, "userFrom": req.body.userFrom, "category": req.body.category })
    .exec((err, ) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true })
    })
});

router.post('/getFollowingList', (req, res) => {
  Follow.find({ "userFrom": req.body.userID })
    .populate('userTo')
    .exec((err, Following) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, Following })
    })
});

router.post('/getFollowerList', (req, res) => {
  Follow.find({ "userTo": req.body.userID })
    .populate('userFrom')
    .exec((err, Follower) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, Follower })
    })
});

module.exports = router;