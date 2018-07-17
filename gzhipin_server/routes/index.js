
const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5');

const {UserModel} = require('../db/models');
const filter = {password:0,__v:0};

router.post('/update',(req,res) => {
    const {user_id} = req.cookie.user_id;
    if(!user_id){
      res.send({code:1,msg:'请先登录'})
    }
    UserModel.findByIdAndUpdate({_id:user_id},req.body,(err,user) => {
      const {username,_id,type} = user;
      const data = Object.assign(req.body,{username,_id,type});
      res.send({code:0,data});

    })
});
router.post('/register',function (req,res) {
  const {username,password,type} =req.body;
  UserModel.findOne({username},(err,user)=>{
    if(user){
      res.send({code:1,msg:'此用户已存在'});
    }else{
      new UserModel({username,password:md5(password),type}).save((err,user) =>{
        res.cookie('user_id',user._id,{maxAge:1000*3600*24*7});
        res.send({code:0,data:{_id:user._id,username,type}});
      });
    }
  });
});
router.post('/login',function (req,res) {
  const {username,password} =req.body;
  UserModel.findOne({username,password:md5(password)},filter,(err,user)=>{
    if(!user){
      res.send({code:1,msg:'用户名或密码错误'})
    }else{
      res.cookie('user_id',user._id,{maxAge:1000*3600*24*7});
      res.send({code: 0, data: user});
    }
  });
});

module.exports = router;
