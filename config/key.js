if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod')  //상용화 했을 때 
}else{
    module.exports = require('./dev')  //상용화 전 개발 단계
}