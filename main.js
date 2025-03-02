const tasks = [
    {
        id: 1,
        title: "Design a website",
        completed: false,
    },
    {
        id: 2,
        title: "Code a website",
        completed: false,
    },
    {
        id: 3,
        title: "Launch a website",
        completed: true,
    },
];

const taskList = document.querySelector(".task-list");
console.log(taskList);

const html = tasks
    .map((task) => {
        return `
        <li class="task-item ${task.completed ? "completed" : ""}" data-id="${task.id}">
            <span class="task-title">${task.title}</span>
            <div class="task-action">
                <button class="task-btn edit">Edit</button>
                <button class="task-btn done">
                    ${task.completed ? "Mark as Done" : "Mark as UnDone"}
                </button>
                <button class="task-btn delete">Delete</button>
            </div>
        </li>
`;
    })
    .join("");

taskList.innerHTML = html;
