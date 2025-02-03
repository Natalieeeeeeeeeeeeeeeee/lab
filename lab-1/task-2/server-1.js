const express = require('express');
const app = express();
const port = 3000;

let messages = []; // Масив для збереження повідомлень

// Статичні файли (клієнтська частина)
app.use(express.static('public'));

// SSE маршрут для надсилання повідомлень
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Відправка останнього повідомлення тільки при підключенні
  const lastMessage = messages[messages.length - 1];
  if (lastMessage) {
    res.write(`data: ${JSON.stringify(lastMessage)}\n\n`);
  }

  // Підписка на нові повідомлення
  const interval = setInterval(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1];
      res.write(`data: ${JSON.stringify(newMessage)}\n\n`);
    }
  }, 1000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

// Маршрут для додавання нового повідомлення
app.post('/message', express.json(), (req, res) => {
  const message = req.body.message;
  const user = req.body.user;

  if (message && user) {
    const newMessage = { user, message, time: new Date().toLocaleTimeString() };
    messages.push(newMessage);
    res.status(200).send({ message: 'Message received' });
  } else {
    res.status(400).send({ message: 'Invalid message' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
