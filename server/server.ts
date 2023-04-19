//io.emit == boardcast
import express, { Router } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import indexRouter from './routes';
import { handleSockIOEvents } from './routes/socket';

const port = 8080;
const app = express();

// Put express into http and open Server 3000 port
const server = http.createServer(app)
  .listen(port, () => { console.log('Node Server Initialized') });

// Give Server to socket.io execute
const io = new SocketIOServer(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
});

app.use('/', indexRouter);
handleSockIOEvents(io)