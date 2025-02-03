const express = require('express');
const app = express();
const port = 3000;

// Список покупок (масив)
let shoppingLists = {
  'list1': [
    { name: 'Яблука', quantity: 2, purchased: false },
    { name: 'Молоко', quantity: 1, purchased: true }
  ],
  'list2': [
    { name: 'Хліб', quantity: 3, purchased: false },
    { name: 'Кава', quantity: 1, purchased: false }
  ]
};

app.use(express.static('public'));
app.use(express.json());

// Отримати список за іменем
app.get('/api/shopping-list/:listName', (req, res) => {
  const listName = req.params.listName;
  if (shoppingLists[listName]) {
    res.json(shoppingLists[listName]);
  } else {
    res.status(404).json({ message: 'Список не знайдено' });
  }
});

// Додати новий елемент в список
app.post('/api/shopping-list/:listName', (req, res) => {
  const listName = req.params.listName;
  const { name, quantity, purchased } = req.body;
  
  if (!shoppingLists[listName]) {
    shoppingLists[listName] = [];
  }
  
  shoppingLists[listName].push({ name, quantity, purchased });
  res.status(201).json({ message: 'Елемент додано' });
});

// Видалити елемент зі списку
app.delete('/api/shopping-list/:listName/:itemName', (req, res) => {
  const listName = req.params.listName;
  const itemName = req.params.itemName;
  
  if (shoppingLists[listName]) {
    shoppingLists[listName] = shoppingLists[listName].filter(item => item.name !== itemName);
    res.json({ message: 'Елемент видалено' });
  } else {
    res.status(404).json({ message: 'Список не знайдено' });
  }
});

// Видалити список
app.delete('/api/shopping-list/:listName', (req, res) => {
  const listName = req.params.listName;
  if (shoppingLists[listName]) {
    delete shoppingLists[listName];
    res.json({ message: 'Список видалено' });
  } else {
    res.status(404).json({ message: 'Список не знайдено' });
  }
});

app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});
