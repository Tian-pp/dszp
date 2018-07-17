// 1. 连接数据库
// 1.1. 引入mongoose
// 1.2. 连接指定数据库(URL只有数据库是变化的)
// 1.3. 获取连接对象
// 1.4. 绑定连接完成的监听(用来提示连接成功)
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test_zhipin');
mongoose.connection.on('connected',function () {
  console.log("数据库链接成功");
})
// 2. 得到对应特定集合的Model
// 2.1. 字义Schema(描述文档结构)
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
  }
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('users',UserSchema)

// 3. 通过Model或其实例对集合数据进行CRUD操作
// 3.1. 通过Model实例的save()添加数据
function save() {
  const user ={
    username:"lili",
    password:"123",
    type:"dashen"
  }
  const userModel = new UserModel(user);
  userModel.save(function (error,user) {
    console.log('save',error, user);
  })
}
//save();
// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function findOne() {
  UserModel.find(function (error,user) {
    console.log('find',error, user);
  })
  UserModel.findOne({username:'lili'},function (error,user) {
    console.log('findOne',error, user);
  })
}
//findOne()
// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function findById() {
  UserModel.findByIdAndUpdate({_id:'5b4da99a26f7e61408737bdb'},{name:'jack'},function (error,data) {
    console.log('findByIdAndUpdate',error, data);
  })
}
//findById();
// 3.4. 通过Model的remove()删除匹配的数据
function romove() {
  UserModel.remove({_id:'5b4da99a26f7e61408737bdb'},function (error,data) {
    console.log('findByIdAndUpdate',error, data);
  })
}
romove()