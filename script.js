// Initialise Tasks Array
let tasks = [];

// update helpers 
let formObjectif = "add";
let taskIndexToUpdate;

// Form Div
let taskForm = document.getElementById("modal");

// Form Inputs
const title = document.querySelector('input[name="title"]');
const description = document.querySelector('textarea[name="description"]');
const startDate = document.querySelector('input[name="startDate"]');
const endDate = document.querySelector('input[name="endDate"]');
const statut = document.querySelector('select[name="status"]');
const priority = document.querySelector('select[name="priority"]');
const form = document.querySelector('form');

// Task Lists
const toDoList = document.getElementById("todo-list");
const doingList = document.getElementById("doing-list");
const doneList = document.getElementById("done-list");

// Counters
const todoCount = document.getElementById('todo-count');
const doingCount = document.getElementById('doing-count');
const doneCount = document.getElementById('done-count');

// Open Task Form
function openTaskForm() {
    taskForm.style.display = "block";
}

// Close Task Form
function closeTaskForm() {
    taskForm.style.display = "none";
}

function formObjectifFunction() {
    if (formObjectif == "add") {
        addTask();
    } else if(formObjectif = "update" ) {
        actuallyUpdate();
    }
}
// Create Task Function
function addTask() {

    if (!title.value || !description.value || !startDate.value || !endDate.value || !statut.value || !priority.value) {
        alert("Please fill in all fields before submitting.");
        return; 
    }

    let newTask = {
        title: title.value,
        description: description.value,
        startDate: startDate.value,
        endDate: endDate.value,
        statuts: statut.value,
        priority: priority.value
    };

    tasks.push(newTask);
    closeTaskForm();
    showTasks();

    form.reset();
}

// Show Tasks and Update Counters
function showTasks() {
    toDoList.innerHTML = "";
    doingList.innerHTML = "";
    doneList.innerHTML = "";

    let todoCounter = 0;
    let doingCounter = 0;
    let doneCounter = 0;

    for (let index = 0; index < tasks.length; index++) {

        let task = tasks[index];
        const taskHtml = `

             <div class="task ${task.priority}" data-title="${task.title}" data-description="${task.description}" data-datestart="${task.startDate}" data-dateend="${task.endDate}" data-statut="${task.statuts}" data-priority="${task.priority}">
                <p><strong>${task.title}</strong></p>
                <p>${task.description}</p>
                <p>${task.startDate} to ${task.endDate}</p>
                <div class="task-buttons">
                    <button class="btn btn-sm btn-outline-danger me-2" onclick="deleteTask(${index})">Delete</button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateTask(${index})">Edit</button>
                </div>
            </div>
        `;

        if (task.statuts === "todo") {
            toDoList.innerHTML += taskHtml;
            todoCounter++;
        } else if (task.statuts === "doing") {
            doingList.innerHTML += taskHtml;
            doingCounter++;
        } else if (task.statuts === "done") {
            doneList.innerHTML += taskHtml;
            doneCounter++;
        }

    }

      // Update counters
      todoCount.textContent = todoCounter;
      doingCount.textContent = doingCounter;
      doneCount.textContent = doneCounter;
}


// Delete Task
function deleteTask(index) {
    const task = document.querySelectorAll('.task')[index];
    task.style.transition = "opacity 0.5s";
    task.style.opacity = 0;

    // Wait for the fade-out transition to complete
    setTimeout(() => {
        tasks.splice(index, 1);
        showTasks();
    }, 500); 
}


// Update Task
function updateTask(index) {
    
    openTaskForm();
    formObjectif = "update";
    let taskToUpdate = tasks[index];
    taskIndexToUpdate = index;

    title.value = taskToUpdate.title;
    description.value = taskToUpdate.description;
    startDate.value = taskToUpdate.startDate;
    endDate.value = taskToUpdate.endDate;
    statut.value = taskToUpdate.statuts;
    priority.value = taskToUpdate.priority;

}

function actuallyUpdate() {

    if (!title.value || !description.value || !startDate.value || !endDate.value || !statut.value || !priority.value) {
        alert("Please fill in all fields before submitting.");
        return; 
    }

    let task = {
        title: title.value,
        description: description.value,
        startDate: startDate.value,
        endDate: endDate.value,
        statuts: statut.value, // Fixed typo: "statuts"
        priority: priority.value
    };

    tasks[taskIndexToUpdate] = task;
    showTasks();
    closeTaskForm();
    form.reset();
    formObjectif = "add";

}

showTasks();



