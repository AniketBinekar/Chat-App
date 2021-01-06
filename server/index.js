const io=require('socket.io')(80)
const users={};
 
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('new-user-joined',name)
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]})
    });
    socket.on('disconnet',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})