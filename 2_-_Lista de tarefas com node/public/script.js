document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Carregar tarefas existentes
    fetchTasks();

    // Adicionar nova tarefa
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            await addTask(taskText);
            taskInput.value = '';
            fetchTasks();
        }
    });

    // Funções para interagir com a API
    async function fetchTasks() {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        renderTasks(tasks);
    }

    async function addTask(text) {
        await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
    }

    async function toggleTaskComplete(id) {
        await fetch(`/api/tasks/${id}`, { method: 'PUT' });
    }

    async function deleteTask(id) {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    }

    // Renderizar tarefas na lista
    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${task.text}</span>
                <button onclick="deleteTask(${task.id})">Remover</button>
            `;
            li.addEventListener('click', async () => {
                await toggleTaskComplete(task.id);
                fetchTasks();
            });
            taskList.appendChild(li);
        });
    }

    // Tornar a função deleteTask global para que possa ser chamada pelo onclick
    window.deleteTask = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };
});