
const {ChatModel} = require('../db/models')
module.exports=function (server) {
  const io = require('socket.io')(server);
  io.on('connection',function (socket) {
    console.log('浏览器输出成功');
    socket.on('sendMsg',function ({content,from,to}) {
      console.log('sendMsg',{content,from,to});
      const chat_id = from + '_' + to;
      const create_time = Date.now();
      new ChatModel({content,from,to,chat_id,create_time}).save(function (error,chatMsg) {
        io.emit('receiveMsg',chatMsg)
        console.log('receiveMsg', chatMsg);
      })
    })
  })
}