const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
      type: String,
      maxlength: 50
  },
  email: {
      type: String,
      trim: true,
      unique: 1
  },
  password: {
      type: String,
      minlength: 5
  },
  role: {
      type: Number,
      default: 0
  },
  image: String,
  token: {
      type: String
  },
  tokenExp: {
      type: Number
  }
})


userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        //bcrypt로 패스워드 암호화 후 저장
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    //비밀번호 확인 
    //lainPassword를 암호화 하여 email주소정보에 맞는 비밀번호와 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    //로그인 시 토큰 생성 
    // user id + 'loginToken'을 암호화
    var user = this;
    var token =  jwt.sign(user._id.toHexString(),'loginToken')

    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.decodeToken = function (token, cb) {
    //토큰을 복호화 하여 _id를 얻고 이를 데이터베이스에서 조회
    var user = this;

    jwt.verify(token,'loginToken',function(err, decoded){
        user.findOne({'_id': decoded, 'token':token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User }

