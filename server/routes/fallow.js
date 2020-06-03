const express = require('express');
const router = express.Router();

const { Fallow } = require("../models/Fallow");


//=================================
//             Fallow
//=================================



router.post('/fallowInfo', (req, res) => {
  //DB에 카테고리 추가
  Fallow.findOne({ "userTo": req.body.userTo, "userFrom":req.body.userFrom, "category":req.body.category })
      .exec((err, fallow) => {
          if (!fallow) return res.status(200).json({ success: false })
          res.status(200).json({ success: true, fallow })
      })

});

router.post('/fallow', (req, res) => {
  //DB에 fallow 정보 저장

  const fallow = new Fallow(req.body)
  fallow.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err})
    
    //status 200 = success
    return res.status(200).json({ 
      success: true,
      message: "successfully added categoty"
     })
  });

});


router.post('/unFallow', (req, res) => {
  //DB에서 user 정보 가져옴
  Fallow.findOneAndDelete({ "userTo": req.body.userTo, "userFrom":req.body.userFrom, "category":req.body.category })
      .exec((err, ) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true })
      })
});

module.exports = router;