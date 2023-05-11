//io.emit == boardcast
import express, { Request, Response } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { handleSockIOEvents } from './routes/socket';
import cors from 'cors'
import bodyParser from 'body-parser';
import handleLogin from './routes/login';
const port = 8080;
const app = express();
app.use(
  cors({
    origin:'http://localhost:3000',
  })
) //for cross-port communications
app.use(bodyParser.json()); //Can only read POST request Having this (undefined -> have those) 


// Put express into http and open Server 8080 port
const server = http.createServer(app)
  .listen(port, () => { console.log('Node Server Initialized') });

// Give Server to socket.io execute
const io = new SocketIOServer(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
});

handleSockIOEvents(io)

//For Login Page
app.options('/login', cors());
app.post('/login',cors(), (req: Request, res: Response) => {
  handleLogin(req, res)
})

app.get('/toGoogle', (req: Request, res: Response) => {
  res.redirect('http://google.com')
})