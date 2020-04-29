const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json
app.use(bodyParser.json())

app.use(cookieParser())

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.get('/', (req,res) => res.send('hello world'))

app.get('/api/hello', (req,res) => res.send('proxy test'))

app.post('/api/users/register', (req,res) => {
  //회원가입시 필요한 정보를 클라이언트에서 가져오면 데이터베이스에 저장
  //유저 모델을 가져와야 함
  const user = new User(req.body)

  //mongoDB method - 정보들이 user 모델에 저장됨
  //save 전에 비밀번호 암호화 User.js pre function
  user.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err})
    
    //status 200 = success
    return res.status(200).json({ success: true })
  })

})

app.post('/api/users/login', (req,res) => {
  
  User.findOne({ email: req.body.email }, (err,user)=>{
    //이메일 확인
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "존재하지 않는 email 입니다."
      })
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
      })

    })
  })
})

app.get('/api/users/auth', auth, (req,res)=>{
  //middleware통과 = authentication 완료
  res.status(200).json({
    _id: req.user._id,
    isAdmin : req.user.role === 0 ? false: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image
  })
  
})

app.get('/api/users/logout', auth, (req,res)=>{
  User.findOneAndUpdate({ _id: req.user._id }, { token: null }, (err,user)=>{
    if(err) return res.json({ success: false, err })
    return res.status(200).send({ 
      success: true,
      message: "로그아웃 되었습니다."
    })
  })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
