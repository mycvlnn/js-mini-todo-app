const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const STORAGE_KEY = "TODO_LIST";
const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const taskList = $(".task-list");
const todoForm = $(".todo-form");
const input = $("#todo-input");
const submitBtn = $("#submit");

const saveTasks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const renderTasks = () => {
    if (tasks.length <= 0) {
        taskList.innerHTML = `<p class="empty-message">No task available.</p>`;

        return;
    }

    const html = tasks
        .map((task, index) => {
            return `
        <li class="task-item ${task.completed ? "completed" : ""}" data-index="${index}">
            <span class="task-title">${escapeHtml(task.title)}</span>
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

// Hàm chuyển đổi ký tự HTML đặc biệt thành ký tự escape
// Ví dụ: < -> &lt;, > -> &gt;, & -> &amp;
function escapeHtml(unsafe) {
    const div = document.createElement("div");
    div.innerText = unsafe; // Sử dụng innerText để chuyển đổi ký tự đặc biệt

    return div.innerHTML; // Trả về HTML đã được escape
}

const addTask = () => {
    if (isDuplicateTask(input.value)) {
        alert("Task is already exist!");
        return;
    }

    const newTitle = input.value.trim();

    const task = {
        title: newTitle,
        completed: false,
    };
    tasks.push(task);
    renderTasks();
    saveTasks();
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

        taskItem.title = newTitle.trim();

        renderTasks();
        saveTasks();
    }

    // Xử lý xoá
    if (e.target.matches(".task-btn.delete")) {
        if (confirm(`Are you sure you want to delete "${taskItem.title}"`)) {
            tasks.splice(taskIndex, 1);
            renderTasks();
            saveTasks();
        }
    }

    // Xử lý đánh dấu là hoàn thành
    if (e.target.matches(".task-btn.done")) {
        taskItem.completed = !taskItem.completed;
        renderTasks();
        saveTasks();
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
