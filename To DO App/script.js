let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const searchInput = document.getElementById("searchInput");

const clearCompleted =
document.getElementById("clearCompleted");

const emptyState =
document.getElementById("emptyState");

const themeToggle =
document.getElementById("themeToggle");

const toast =
document.getElementById("toast");

// Toast
function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);
}

// Local Storage
function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// Stats
function updateStats(){

    const completed =
    tasks.filter(task=>task.completed).length;

    totalTasks.textContent =
    tasks.length;

    completedTasks.textContent =
    completed;

    pendingTasks.textContent =
    tasks.length - completed;
}

// Render
function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Search
    const keyword =
    searchInput.value.toLowerCase();

    filteredTasks =
    filteredTasks.filter(task =>
        task.text.toLowerCase()
        .includes(keyword)
    );

    // Filter
    if(currentFilter === "active"){
        filteredTasks =
        filteredTasks.filter(
            task => !task.completed
        );
    }

    if(currentFilter === "completed"){
        filteredTasks =
        filteredTasks.filter(
            task => task.completed
        );
    }

    if(filteredTasks.length === 0){
        emptyState.classList.remove("hidden");
    }else{
        emptyState.classList.add("hidden");
    }

    filteredTasks.forEach(task=>{

        const li =
        document.createElement("li");

        li.className =
        task.completed
        ? "task completed"
        : "task";

        li.innerHTML = `
        <div class="task-left">

            <input
            type="checkbox"
            ${task.completed ? "checked" : ""}
            >

            <div>
                <span>${task.text}</span>
                <small>
                ${task.dueDate || ""}
                </small>
            </div>

        </div>

        <button class="delete-btn">
            Delete
        </button>
        `;

        // Complete
        li.querySelector("input")
        .addEventListener("change",()=>{

            task.completed =
            !task.completed;

            saveTasks();
            renderTasks();

            showToast("Task Updated");
        });

        // Delete
        li.querySelector(".delete-btn")
        .addEventListener("click",()=>{

            tasks =
            tasks.filter(
                t => t.id !== task.id
            );

            saveTasks();
            renderTasks();

            showToast("Task Deleted");
        });

        taskList.appendChild(li);
    });

    updateStats();
}

// Add Task
function addTask(){

    const text =
    taskInput.value.trim();

    if(!text) return;

    tasks.push({
        id: Date.now(),
        text,
        dueDate: dueDate.value,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value="";
    dueDate.value="";

    showToast("Task Added");
}

addTaskBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    e=>{
        if(e.key==="Enter"){
            addTask();
        }
    }
);

// Search
searchInput.addEventListener(
    "input",
    renderTasks
);

// Filters
document
.querySelectorAll(".filter-btn")
.forEach(btn=>{

    btn.addEventListener(
        "click",
        ()=>{

            document
            .querySelectorAll(".filter-btn")
            .forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            currentFilter =
            btn.dataset.filter;

            renderTasks();
        }
    );
});

// Clear Completed
clearCompleted.addEventListener(
    "click",
    ()=>{

        tasks =
        tasks.filter(
            task => !task.completed
        );

        saveTasks();
        renderTasks();

        showToast(
            "Completed Tasks Removed"
        );
    }
);

// Dark Mode
const darkMode =
localStorage.getItem("darkMode");

if(darkMode === "enabled"){
    document.body.classList.add("dark");
}

themeToggle.addEventListener(
    "click",
    ()=>{

        document.body
        .classList.toggle("dark");

        if(
            document.body.classList
            .contains("dark")
        ){

            localStorage.setItem(
                "darkMode",
                "enabled"
            );

        }else{

            localStorage.setItem(
                "darkMode",
                "disabled"
            );
        }
    }
);

// Initial Render
renderTasks();