const ws = new WebSocket('ws://localhost:3000');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Завантаження завдань із localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Додавання нового завдання
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName === '') return;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = { id: Date.now(), name: taskName };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Відправляємо повідомлення на сервер для оновлення завдань на всіх клієнтах
    ws.send(JSON.stringify({ type: 'update' }));

    taskInput.value = '';
    loadTasks();
}

// Видалення завдання по ID
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Відправляємо повідомлення на сервер для оновлення завдань на всіх клієнтах
    ws.send(JSON.stringify({ type: 'update' }));

    loadTasks();
}

// Видалення всіх завдань
function clearTasks() {
    localStorage.removeItem('tasks');

    // Відправляємо повідомлення на сервер для оновлення завдань на всіх клієнтах
    ws.send(JSON.stringify({ type: 'update' }));

    loadTasks();
}

// Отримуємо повідомлення від сервера
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
        loadTasks();
    }
};

// Завантажуємо список при відкритті сторінки
loadTasks();
