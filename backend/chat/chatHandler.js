import { Server } from 'socket.io';

const io = new Server();

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

export default io;
