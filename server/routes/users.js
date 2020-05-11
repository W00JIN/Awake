const express = require('express');
const router = express.Router();

const { User } = require("../models/User");
const { auth } = require("../middleware/auth");


//=================================
//             User
//=================================



router.post('/register', (req,res) => {
  //회원가입시 필요한 정보를 클라이언트에서 가져오면 데이터베이스에 저장
  //유저 모델을 가져와야 함
  const user = new User(req.body)

  //mongoDB method - 정보들이 user 모델에 저장됨
  //save 전에 비밀번호 암호화 User.js pre function
  user.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err})
    
    //status 200 = success
    return res.status(200).json({ success: true })
  });
});

router.post('/login', (req,res) => {
  
  User.findOne({ email: req.body.email }, (err,user)=>{
    //이메일 확인
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "존재하지 않는 email 입니다."
      });
    }
    //이메일에 맞는 비번 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      //비밀번호까지 맞으면 토큰 생성
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);
        //token을 쿠키에 저장 (로컬 스토리지나 세션에도 저장 가능)
        res.cookie('x_auth', user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id, token: user.token })
      });

    });
  });
});

router.get('/auth', auth, (req,res)=>{
  //middleware통과 = authentication 완료
  res.status(200).json({
    _id: req.user._id,
    isAdmin : req.user.role === 0 ? false: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image
  });
  
});

router.get('/logout', auth, (req,res)=>{
  User.findOneAndUpdate({ _id: req.user._id }, { token: null }, (err,user)=>{
    if(err) return res.json({ success: false, err })
    return res.status(200).send({ 
      success: true,
      message: "로그아웃 되었습니다."
    });
  });
});

module.exports = router;