// Завантаження завдань із localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteTask(task.id);
        
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Додавання нового завдання
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName === '') return;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = { id: Date.now(), name: taskName }; // Генеруємо унікальний ID
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    loadTasks();
}

// Видалення завдання по ID
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Видалення всіх завдань
function clearTasks() {
    localStorage.removeItem('tasks');
    loadTasks();
}

// Завантажуємо список при відкритті сторінки
loadTasks();
