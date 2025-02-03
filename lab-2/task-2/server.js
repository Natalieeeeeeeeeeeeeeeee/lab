const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = 3000;

// Використання папки public для статичних файлів
app.use(express.static('public'));

// Створюємо WebSocket сервер
const wss = new WebSocket.Server({ noServer: true });

// Обробка підключень WebSocket
wss.on('connection', (ws) => {
    console.log('Клієнт підключився');
  
    // Клієнт відправляє повідомлення
    ws.on('message', (message) => {
        console.log('Отримано повідомлення: ', message);
      
        // Розсилаємо це повідомлення всім підключеним клієнтам
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Ручне прокидання з'єднання WebSocket
app.server = app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});

// Налаштовуємо WebSocket на новому порту
app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
