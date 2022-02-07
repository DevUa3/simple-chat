 const io = require('socket.io')
 (5000,
  {
  cors : {
    origin : '*'
  }
 });

 const users = {};

 io.on('connection', socket =>{
   socket.on('newUser', userName =>{
     users[socket.id] = userName
     console.log(users[socket.id])
    socket.broadcast.emit('userConected', userName)
   });
   socket.on('sendmessage', message =>{
    socket.broadcast.emit('emitmessage', {message : message, userName : users[socket.id]})
   })
   socket.on('disconnect', () =>{
    socket.broadcast.emit('userdisconected', users[socket.id]);
    delete users[socket.id];
   })
 })