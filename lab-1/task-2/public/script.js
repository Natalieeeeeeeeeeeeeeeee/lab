const chatForm = document.getElementById('chatForm');
const messageList = document.getElementById('messageList');
const userInput = document.getElementById('user');
const messageInput = document.getElementById('message');

let lastMessage = null; // Зберігаємо останнє отримане повідомлення

// Підключення до SSE каналу
const eventSource = new EventSource('/events');

eventSource.onmessage = function (event) {
  const msg = JSON.parse(event.data);

  // Перевіряємо, чи це нове повідомлення
  if (!lastMessage || lastMessage.time !== msg.time || lastMessage.message !== msg.message) {
    lastMessage = msg; // Оновлюємо останнє отримане повідомлення

    // Додаємо повідомлення до списку
    const messageItem = document.createElement('li');
    messageItem.innerHTML = `<strong>${msg.user}</strong> (${msg.time}): ${msg.message}`;
    messageList.appendChild(messageItem);
  }
};

// Обробка форми для відправки повідомлень
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = userInput.value.trim();
  const message = messageInput.value.trim();

  if (user && message) {
    // Відправка повідомлення на сервер
    await fetch('/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, message })
    });

    // Очищаємо поле вводу
    messageInput.value = '';
  }
});
