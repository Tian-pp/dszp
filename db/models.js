// 1. 连接数据库
// 1.1. 引入mongoose
const mongoose = require('mongoose');
// 1.2. 连接指定数据库(URL只有数据库是变化的)
// 1.3. 获取连接对象
// 1.4. 绑定连接完成的监听(用来提示连接成功)
mongoose.connect('mongodb://localhost:27017/boss_zp');
mongoose.connection.on('connected',function () {
  console.log('数据库链接成功');
})
const UserSchema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  header :{type: String},
  info:{type: String},
  post:{type: String},
  salary:{type: String},
  company:{type: String}
})
const UserModel = mongoose.model('users',UserSchema)
// 2. 定义出对应特定集合的Model并向外暴露
// 2.1. 字义Schema(描述文档结构)
// 2.2. 定义Model(与集合对应, 可以操作集合)
// 2.3. 向外暴露Model
exports.UserModel= UserModel;