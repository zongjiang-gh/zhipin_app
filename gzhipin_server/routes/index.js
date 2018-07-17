var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/register',function (req,res,next) {
  const {username,password} =req.body;
  console.log('register',username,password);
  if(username === 'admin'){
    res.render({code:1,msg:'此用户已存在'})
  }else{
    res.send({code:0,data:{_id:'abc',username,password}})
  }
});

module.exports = router;
