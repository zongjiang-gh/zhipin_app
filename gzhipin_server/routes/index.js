const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5');

const {UserModel, ChatModel} = require('../db/models');
const filter = {password: 0, __v: 0};

router.get('/user', (req, res) => {
  const userid = req.cookies.user_id;
  if (!userid) {
    res.send({code: 1, msg: '请先登录'});
    return;
  }
  UserModel.findOne({_id: userid}, filter, (err, user) => {
    res.send({code: 0, data: user})
  })
});

router.post('/update', (req, res) => {

  const {user_id} = req.cookies;
  if (!user_id) {
    res.send({code: 1, msg: '请先登录'});
    return;
  }
  console.log(req.body);
  UserModel.findByIdAndUpdate({_id: user_id}, req.body, (err, user) => {
    const {username, _id, type} = user;
    const data = Object.assign(req.body, {username, _id, type});
    res.send({code: 0, data});

  })
});

router.post('/register', function (req, res) {
  const {username, password, type} = req.body;
  UserModel.findOne({username}, (err, user) => {
    if (user) {
      res.send({code: 1, msg: '此用户已存在'});
    } else {
      new UserModel({username, password: md5(password), type}).save((err, user) => {
        res.cookie('user_id', user._id, {maxAge: 1000 * 3600 * 24 * 7});
        res.send({code: 0, data: {_id: user._id, username, type}});
      });
    }
  });
});

router.post('/login', function (req, res) {
  const {username, password} = req.body;
  UserModel.findOne({username, password: md5(password)}, filter, (err, user) => {
    if (!user) {
      res.send({code: 1, msg: '用户名或密码错误'})
    } else {
      res.cookie('user_id', user._id, {maxAge: 1000 * 3600 * 24 * 7});
      res.send({code: 0, data: user});
    }
  });
});

router.get('/userlist', (req, res) => {
  const {type} = req.query;
  UserModel.find({type}, filter, (err, users) => {
    res.json({code: 0, data: users})
  })
});

router.get('/msglist', (req, res) => {
  const userid = req.cookies.user_id;
  UserModel.find((err, usersdata) => {
    const users = {};
    usersdata.forEach(({username, header, _id}) => {
      users[_id] = {username, header};
    });
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, (err, chatMsgs) => {
      res.send({code: 0, data: {users, chatMsgs}})
    });

  });


});
router.post('/readmsg', (req, res) => {
  const {from} = req.body;
  const to = req.cookies.user_id;
  // {code: 0, data: 2}返回值
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    if (!err) {
      res.send({code: 0, data: doc.nModified}) // 更新的数量
    }
  })


});
module.exports = router;
