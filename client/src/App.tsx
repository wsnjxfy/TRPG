import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// 创建WebSocket连接
const socket = io('http://localhost:8080');

const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  // 监听聊天记录和新消息
  useEffect(() => {
    socket.on('chatHistory', (history: string[]) => {
      setChatHistory(history);
    });

    socket.on('chatMessage', (message: string) => {
      setChatHistory((prev) => [...prev, message]);
    });

    return () => {
      socket.off('chatHistory');
      socket.off('chatMessage');
    };
  }, []);

  // 发送消息
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>线上聊天室</h1>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <strong>聊天记录:</strong>
        </div>
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'scroll',
            border: '1px solid #ccc',
            padding: '10px',
          }}
        >
          {chatHistory.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
      </div>

      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px' }}>
          发送
        </button>
      </div>
    </div>
  );
};

export default App;
