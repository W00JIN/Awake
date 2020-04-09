const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { User } = require('./models/User.js')
const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json
app.use(bodyParser.json())

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.get('/', (req,res) => res.send('hello world'))

app.post('/register', (req,res) => {
  //회원가입시 필요한 정보를 클라이언트에서 가져오면
  //그걸 디비에 넣어준다.
  //유저 모델을 가져와야 함.
  const user = new User(req.body)

  //mongoDB method - 정보들이 user 모델에 저장됨
  user.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err})
    
    //status 200 = success
    return res.status(200).json({ success: true })
  })

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
