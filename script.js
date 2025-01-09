let taskList = document.getElementById('task-list');
let addTaskBtn = document.getElementById('add-task');
let taskInput = document.getElementById('task');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText) {
        let task = {
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTaskList();
        taskInput.value = '';
    }
}

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        let taskHtml = `
            <li>
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span ${task.completed ? 'class="completed"' : ''}>${task.text}</span>
                <button class="delete-task">Delete</button>
            </li>
        `;
        taskList.insertAdjacentHTML('beforeend', taskHtml);
        let deleteTaskBtn = taskList.children[index].querySelector('.delete-task');
        deleteTaskBtn.addEventListener('click', () => deleteTask(index));
        let checkbox = taskList.children[index].querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => toggleTaskCompletion(index));
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTaskList();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTaskList();
}