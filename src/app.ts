import 'dotenv/config'
import express from 'express';
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
import { router } from './routes';

const app = express();
app.use(cors())

const serverHttp = http.createServer(app)

const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  console.log('usuario conectado no socket', socket.id);
})

app.use(express.json())
app.use(router);

export { serverHttp, io }
