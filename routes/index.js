var express = require('express');
var router = express.Router();
const dm5 = require('blueimp-md5')
const filter = {password:0};
const {UserModel}=require('../db/models');

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
  
});
router.post('/login', function(req, res) {
  const {username, password} = req.body;
  UserModel.findOne({username, password: dm5(password)}, filter, function (error, user) {
    if (!user) {
      res.send({code: 1, msg: '用户名或密码错误'})
    } else {
      res.cookie('userId', user._id, {maxAge: 1000 * 60 * 60 * 24 * 7})
      res.send({code: 0, data: user});
    }
  })
});

// 更新用户路由
router.post('/update', function (req, res) {
  // 得到请求cookie的userId
  const userId = req.cookies.userId
 
  
  if(!userId) {// 如果没有, 说明没有登陆, 直接返回提示
    return res.send({code: 1, msg: '请先登陆'});
}

// 更新数据库中对应的数据
UserModel.findByIdAndUpdate({_id: userId}, req.body, function (err, user) {// user是数据库中原来的数据
  console.log(user);
  const {_id, username, type} = user
  // node端 ...不可用
  // const data = {...req.body, _id, username, type}
  // 合并用户信息
  const data = Object.assign(req.body, {_id, username, type})
  // assign(obj1, obj2, obj3,...) // 将多个指定的对象进行合并, 返回一个合并后的对象
  res.send({code: 0, data})
})
})

// 根据cookie获取对应的user
router.get('/user', function (req, res) {
  // 取出cookie中的userId
  const userId = req.cookies.userId
  if(!userId) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  
  // 查询对应的user
  UserModel.findOne({_id: userId}, filter, function (err, user) {
    return res.send({code: 0, data: user})
  })
})

/*
查看用户列表
 */
router.get('/list',function(req, res){
  const { type } = req.query
  UserModel.find({type},function(err,users){
    return res.json({code:0, data: users})
  })
})

module.exports = router;
