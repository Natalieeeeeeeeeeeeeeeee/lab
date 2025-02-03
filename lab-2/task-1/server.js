const express = require('express');
const app = express();
const port = 3000;

// Використання папки public для статичних файлів
app.use(express.static('public'));

// Запускаємо сервер
app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});
