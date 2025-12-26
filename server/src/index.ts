import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'; // 引入 CORS 中间件

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // 允许来自 http://localhost:5173 的请求
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

// 存储聊天记录
const chatHistory: string[] = [];

// 使用 CORS 中间件，允许前端请求
app.use(
  cors({
    origin: 'http://localhost:5173', // 只允许来自 http://localhost:5173 的请求
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// 路由：简单的接口，用于测试服务器是否运行
app.get('/', (req, res) => {
  res.send('Chat server is running!');
});

// 监听Socket.io连接
io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);

  // 向新连接的客户端发送历史聊天记录
  socket.emit('chatHistory', chatHistory);

  // 监听消息事件
  socket.on('chatMessage', (message) => {
    console.log('Message received:', message);
    chatHistory.push(message); // 保存聊天记录
    io.emit('chatMessage', message); // 广播消息给所有客户端
  });

  // 断开连接时
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// 设置服务器端口，默认为 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
