// const md5 = require('blueimp-md5');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gzhipin_test');
const connection = mongoose.connection;
connection.on('connected',function () {
  console.log('数据库连接成功');
});

const UserSchema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },

  password : {
    type:String,
    required:true
  },
  type:{
    type:String
  }
});

const UserModel = mongoose.model('users',UserSchema);

function testSave() {
  const userModel = new UserModel({
    username:'lidewang1',
    password:'123123',
    type:'dashen'
  });
  userModel.save((err,user) => console.log("save",err,user));
}
// testSave();
function testFind() {
  UserModel.find({password:123123},{__v:0},(err,user)=>{
    console.log(err,user);
  })
  // UserModel.findOne({username:'lidewang'},{__v:0},(err,user) => console.log(err,user));//找不到是一个null
}
// testFind();
function testUpdate() {
  UserModel.findByIdAndUpdate({_id:'5b4d8ddfb5fb371524a59af2'},{type:'shabi'},(err,user)=>console.log(err,user))
  
}
// testUpdate();
function testRemove() {
  UserModel.remove({},(err,user)=>console.log(err,user))
}
testRemove();