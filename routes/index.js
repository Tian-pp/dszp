var express = require('express');
var router = express.Router();
const dm5 = require('blueimp-md5')
const filter = {password:0};
const {UserModel}=require('../db/models').UserModel;

router.post('/register', function(req, res) {
 const {username,password,type} = req.body;
  UserModel.findOne({username},function (error,user) {
    if(user){
      res.send({code:1,msg:'用户已存在！'})
    }else {
      new UserModel({username,password:dm5(password),type}).save(function (error,user) {
        res.cookie('userId',user._id,{maxAge:1000*60*60*24*7})
        res.send({code:0,data:{_id:user._id,username,type}});
      })
    }
  })
  
  router.post('/register', function(req, res) {
    const {username, password} = req.body;
    UserModel.findOne({username, password: dm5(password)}, filter, function (error, user) {
      if (!user) {
        res.send({code: 1, msg: '用户名或密码错误'})
      } else {
        res.cookie('userId', user._id, {maxAge: 1000 * 60 * 60 * 24 * 7})
        res.send({code: 0, data: user});
      }
    })
  })
});

module.exports = router;
