import { taskList, TaskManager } from "./app.js";

// DOM Manipulation - Starter Code with Errors

// Added the proper DOM selectors
function setupEventListeners() {
  console.log("LOADED THE DOM");

  // Corrected selector method
  const addButton = document.querySelector(".add-task-btn"); // Changed to querySelector
  const taskInput = document.querySelector("#task-input"); // Added # ************************* DOES NOT EXIT IN DOM
  const prioritySelect = document.getElementById("priority");
  const taskListContainer = document.getElementById("task-list");

  // Added null checks before adding listeners

  if (!addButton || !prioritySelect) {
    console.log("missing button");
    return;
  }

  // Adding the options dynamically using the single source of truth [priorities] located in utilis.js
  priorities.forEach((priority) => {
    prioritySelect.insertAdjacentHTML(
      "beforeend",
      `
      <option value=${priority}>${formatTaskName(priority)}</option>
      `,
    );
  });

  addButton.addEventListener("click", handleAddTask);
  taskListContainer.addEventListener("click", handleTaskClick);

  // Missing: other event listeners for form submission, etc. ************************************** DOES this form need to be here
}

// Function with DOM manipulation errors
function handleAddTask() {
  console.log("I Clicked Add Task");

  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  const prioritySelect = document.getElementById("priority");

  // No validation
  // Should use event.preventDefault() if form *********************************************

  const title = titleInput.value;
  const description = descInput.value;
  const priority = prioritySelect.value;
  // Added priority input

  TaskManager.addTask(title, description, priority);
  displayTasks();

  // Added clearing inputs after adding values

  titleInput.value = "";
  descInput.value = "";
  prioritySelect.value = "low";
}

// Function that should use better selectors
function displayTasks() {
  const container = document.getElementById("task-list");

  // Added null check
  if (!container) return;

  // Clearing existing content first

  container.innerHTML = ``;

  // Inefficient - should use template literals and insertAdjacentHTML ***********MAybe Gonna use a foreach here?
  for (let i = 0; i < taskList.length; i++) {
    // const div = document.createElement("div");
    // div.innerHTML = `<h3> ${taskList[i].title} </h3>`;
    // div.innerHTML = div.innerHTML + "<p>" + taskList[i].description + "</p>";
    // container.appendChild(div);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <div>
        <p>ID: ${taskList[i].id} </p>
        <h3> ${taskList[i].title}</h3>
        <p> ${taskList[i].description}</p>
        <p> Priority: ${formatTaskName(taskList[i].priority)}</p>
        <p> Status: ${taskList[i].completed ? "Done" : "Still Busy"}</p>
        <button class="completed-btn" data-id=${taskList[i].id}>${taskList[i].completed ? "Mark as not done" : "Mark as Done"}</button> 
        <button class="deleted-btn" data-id=${taskList[i].id}>Delete</button>


      </div>
      `,
    );
  }
  // Missing: task ID, completion status, event handlers for delete/complete

  // const completedButtons = document.querySelectorAll(".completed-btn");
  // const deletedButtons = document.querySelectorAll(".deleted-btn");

  // completedButtons.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     // First I find where the taskList item matches the current btn's ID then save to a variable
  //     const task = taskList.find(
  //       (task) => task.id === Number(btn.dataset.id), // converting to Number because HTML only saves strings
  //     );
  //     task.setCompleted(); // class handles the logic here of setting the completion status
  //     displayTasks(); // re-render my screen
  //   });
  // });

  // deletedButtons.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     TaskManager.removeTask(btn.dataset.id);
  //     displayTasks(); //re-render my screen
  //   });
  // });
}

// Function with event handling issues
function handleTaskClick(event) {
  const taskId = event.target.dataset.id;

  // Missing: event.target check
  if (event.target.classList.contains("completed-btn")) {
    // First I find where the taskList item matches the current btn's ID then save to a variable
    const task = TaskManager.tasks.find(
      (task) => task.id === Number(taskId), // converting to Number because HTML only saves strings
    );
    task.setCompleted(); // class handles the logic here of setting the completion status
    displayTasks(); //re-render my screen
  }

  if (event.target.classList.contains("deleted-btn")) {
    TaskManager.removeTask(taskId);
    displayTasks(); //re-render my screen
  }

  // Missing: proper event delegation

  // var taskId = event.target.id; // Wrong way to get task ID

  // Should toggle task completion
  console.log("Task clicked: " + taskId);
}

// Missing: JSON conversion functions

// Missing: functions to save/load tasks from localStorage

// Initialize (wrong placement - should use DOMContentLoaded)
document.addEventListener("DOMContentLoaded", setupEventListeners);

// this is dom.js
