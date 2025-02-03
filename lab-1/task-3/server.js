const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Статичні файли з папки "public"
app.use(express.static(path.join(__dirname, 'public')));

// Список криптовалют
const cryptocurrencies = ['Bitcoin', 'Ethereum', 'Ripple', 'Litecoin', 'Cardano'];

// Генерація випадкової ціни
const getRandomPrice = () => (Math.random() * (50000 - 1000) + 1000).toFixed(2);

// Функція для оновлення курсу
const sendUpdates = () => {
    const cryptoData = cryptocurrencies.map(crypto => ({
        name: crypto,
        price: getRandomPrice(),
    }));

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(cryptoData));
        }
    });

    // Наступне оновлення через випадковий час від 1 до 20 секунд
    setTimeout(sendUpdates, Math.random() * (20000 - 1000) + 1000);
};

// Запускаємо WebSocket сервер
wss.on('connection', ws => {
    console.log('Новий клієнт підключився');
    ws.send(JSON.stringify(cryptocurrencies.map(crypto => ({
        name: crypto,
        price: getRandomPrice(),
    }))));

    ws.on('close', () => {
        console.log('Клієнт відключився');
    });
});

// Запускаємо оновлення курсів
sendUpdates();

// Запускаємо сервер
server.listen(8080, () => {
    console.log('Сервер запущено на http://localhost:8080');
});
