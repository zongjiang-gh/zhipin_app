const {ChatModel} = require( '../db/models');

module.exports = function (server) {
  // 得到IO对象
  const io = require('socket.io')(server);
  // 监视连接(当有一个客户连接上时回调)
  io.on('connection', function (socket) {

    socket.on('sendMessage', function (data) {
      const {from,to} = data;
      data.chat_id = [from,to].sort().join('_');
      data.create_time = Date.now();
      new ChatModel(data).save((err,chatMsg) => {
        io.emit('receiveMessage', chatMsg);
        console.log('receiveMessage', chatMsg);
      });
      // 向客户端发送消息(名称, 数据)
      io.emit('receiveMessage', data.name + '_' + data.date);
      console.log('服务器向浏览器发送消息', data)
    })
  })
};
