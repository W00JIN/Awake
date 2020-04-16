const { User } = require('../models/User')

let auth = (req, res, next) => {
    //로그인 인증 처리
   
    //클라이언트 쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth 
    //토큰 복호화 후 데이터베이스에서 유저 정보 찾기
    User.decodeToken(token, (err,user) => {
        if(err) throw err
        if(!user) {
            return res.json({
                authentication : false,
                error : true,
                message: '토큰 정보가 존재하지 않습니다.'
            })
        }
        //호출된 곳의 req로 token과 user정보 보냄
        req.token = token
        req.user = user
        next()
    })
}

module.exports = { auth }