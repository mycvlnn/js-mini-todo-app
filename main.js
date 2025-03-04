const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tasks = [];

const taskList = $(".task-list");
const todoForm = $(".todo-form");
const input = $("#todo-input");
const submitBtn = $("#submit");

const renderTasks = () => {
    if (tasks.length <= 0) {
        taskList.innerHTML = `<p class="empty-message">No task available.</p>`;

        return;
    }

    const html = tasks
        .map((task, index) => {
            return `
        <li class="task-item ${task.completed ? "completed" : ""}" data-index="${index}">
            <span class="task-title">${task.title}</span>
            <div class="task-action">
                <button class="task-btn edit">Edit</button>
                <button class="task-btn done">
                    ${task.completed ? "Mark as UnDone" : "Mark as Done"}
                </button>
                <button class="task-btn delete">Delete</button>
            </div>
        </li>
`;
        })
        .join("");

    taskList.innerHTML = html;
};

// Kiểm tra xem task có bị trùng không
const isDuplicateTask = (newTitle, excludeIndex = -1) => {
    return tasks.some(
        (task, index) =>
            task.title.toLowerCase() === newTitle.toLowerCase() && index !== excludeIndex
    );
};

const addTask = () => {
    if (isDuplicateTask(input.value)) {
        alert("Task is already exist!");
        return;
    }

    const task = {
        title: input.value,
        completed: false,
    };
    tasks.push(task);
    renderTasks();
    input.value = "";
};

const handleSubmitTask = (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
        alert("Please enter something!");
        return;
    }

    addTask();
};

renderTasks();

const handleTaskActions = (e) => {
    const taskItemElement = e.target.closest(".task-item");
    if (!taskItemElement) return;
    const taskIndex = Number(taskItemElement.dataset.index);
    const taskItem = tasks[taskIndex];

    // Xử lý khi click vào nút edit
    if (e.target.matches(".task-btn.edit")) {
        const newTitle = prompt("Please enter the new task", taskItem.title);
        if (newTitle === null) return;
        if (!newTitle.trim()) {
            alert("Please enter something!");
            return;
        }

        if (isDuplicateTask(newTitle, taskIndex)) {
            alert("Task is already exist!");
            return;
        }

        taskItem.title = newTitle;

        renderTasks();
    }

    // Xử lý xoá
    if (e.target.matches(".task-btn.delete")) {
        if (confirm(`Are you sure you want to delete "${taskItem.title}"`)) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }

    // Xử lý đánh dấu là hoàn thành
    if (e.target.matches(".task-btn.done")) {
        taskItem.completed = !taskItem.completed;
        renderTasks();
    }
};

// -------- Xử lý event --------

// Xử lý sự kiện submit form
todoForm.addEventListener("submit", handleSubmitTask);

// Ngăn chặn blur input khi click vào add
submitBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
});

taskList.addEventListener("click", handleTaskActions);
