import { taskList, addTask } from "./app.js";

// DOM Manipulation - Starter Code with Errors

// Added the proper DOM selectors
function setupEventListeners() {
  console.log("LOADED THE DOM");

  // Corrected selector method
  const addButton = document.querySelector(".add-task-btn"); // Changed to querySelector
  const taskInput = document.querySelector("#task-input"); // Added # ************************* DOES NOT EXIT IN DOM

  // Added null checks before adding listeners

  if (!addButton) {
    console.log("missing button");
    return;
  }

  addButton.addEventListener("click", handleAddTask);

  // Missing: other event listeners for form submission, etc. ************************************** DOES this form need to be here
}

// Function with DOM manipulation errors
function handleAddTask() {
  console.log("I Clicked Add Task");

  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  const priorityInput = document.getElementById("priority");

  // No validation
  // Should use event.preventDefault() if form *********************************************

  const title = titleInput.value;
  const description = descInput.value;
  const priority = priorityInput.value;
  // Added priority input

  addTask(title, description, priority);
  displayTasks();

  // Added clearing inputs after adding values

  titleInput.value = "";
  descInput.value = "";
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
        <p>ID: </p>
        <h3> ${taskList[i].title}</h3>
        <p> ${taskList[i].description}</p>
        <p> Priority: ${taskList[i].priority}</p>
        <p> Status: ${taskList[i].completed ? "Done" : "Still Busy"}</p>
        <button>${taskList[i].completed ? "Mark as Done" : "Mark as not done"}</button>
        <button>Delete</button>


      </div>
      `,
    );

    // Missing: task ID, completion status, event handlers for delete/complete
  }
}

// Function with event handling issues
function handleTaskClick(event) {
  // Missing: event.target check
  // Missing: proper event delegation

  var taskId = event.target.id; // Wrong way to get task ID

  // Should toggle task completion
  console.log("Task clicked: " + taskId);
}

// Missing: JSON conversion functions
// Missing: functions to save/load tasks from localStorage

// Initialize (wrong placement - should use DOMContentLoaded)
document.addEventListener("DOMContentLoaded", setupEventListeners);

// this is dom.js
