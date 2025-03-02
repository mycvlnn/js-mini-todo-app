const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tasks = [];
let isEdit = false; // Biến đề đánh dấu là có đang edit hay không
let idEdit = null;

const taskList = $(".task-list");
const todoForm = $(".todo-form");
const input = $("#todo-input");
const submitBtn = $("#submit");

const renderTasks = () => {
    if (tasks.length <= 0) {
        taskList.innerHTML = `<p>No task yet</p>`;

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

const addTask = () => {
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

// -------- Xử lý event --------

// Xử lý sự kiện submit form
todoForm.addEventListener("submit", handleSubmitTask);

// Ngăn chặn blur input khi click vào add
submitBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
});

taskList.addEventListener("click", (e) => {
    const taskItemElement = e.target.closest(".task-item");
    if (!taskItemElement) return;
    const taskIndex = Number(taskItemElement.dataset.index);
    const taskItem = tasks[taskIndex];

    // Xử lý khi click vào nút edit
    if (e.target.matches(".task-btn.edit")) {
        const newTitle = prompt("Please enter the new task", taskItem.title);
        taskItem.title = newTitle;

        renderTasks();
    }

    // Xử lý xoá
    if (e.target.matches(".task-btn.delete")) {
        tasks.splice(taskIndex, 1);
        renderTasks();
    }

    // Xử lý đánh dấu là hoàn thành
    if (e.target.matches(".task-btn.done")) {
        taskItem.completed = !taskItem.completed;
        renderTasks();
    }
});
