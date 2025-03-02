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
        .map((task) => {
            return `
        <li class="task-item ${task.completed ? "completed" : ""}" data-id="${task.id}">
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
        id: tasks.length + 1,
        title: input.value,
        completed: false,
    };
    tasks.push(task);
    renderTasks();
    input.value = "";
};

const editTask = () => {
    const taskEdit = tasks.find((item) => item.id === idEdit);
    if (taskEdit) {
        taskEdit.title = input.value;
        isEdit = false;
        idEdit = null;
        submitBtn.innerText = "Add";
        renderTasks();
        input.value = "";
    }
};

const handleSubmitTask = (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
        alert("Please enter something!");
        return;
    }
    if (isEdit) editTask();
    else addTask();
};

renderTasks();

// -------- Xử lý event --------

// Xử lý sự kiện submit form
todoForm.addEventListener("submit", handleSubmitTask);

// Ngăn chặn blur input khi click vào add
submitBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
});

console.log(taskList);

taskList.addEventListener("click", (e) => {
    const taskItemElement = e.target.closest(".task-item");
    const taskId = Number(taskItemElement.dataset.id);

    // Xử lý khi click vào nút edit
    if (e.target.matches(".task-btn.edit")) {
        const task = tasks.find((item) => item.id === taskId);

        if (task) {
            input.value = task.title;
            submitBtn.innerText = "Edit";
            idEdit = task.id;
            isEdit = true;
        }
    }

    // Xử lý xoá
    if (e.target.matches(".task-btn.delete")) {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex >= 0) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }

    // Xử lý đánh dấu là hoàn thành
    if (e.target.matches(".task-btn.done")) {
        const task = tasks.find((item) => item.id === taskId);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
        }
    }
});
