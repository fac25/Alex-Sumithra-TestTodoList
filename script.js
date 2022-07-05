// Task Class: Represents a Task
class Task {
  constructor(title) {
    this.title = title;
  }
}

// UI Class: Handle UI Tasks

// Create a blank array of tasks
const taskArray = [];
class UI {
  static displayTasks() {}

  static addTaskToList(task) {
    // Take task list from html
    const displayTask = document.querySelector("#task-list");
    // Add paragraph elements as a child to the list
    const para = document.createElement("p");

    // Add each task submitted to the array
    taskArray.push(task.title);

    // Loop through the array and for each task submitted create a new p element with the text as the task
    taskArray.map((task) => {
      para.innerText = task;
    });

    // Append each task to the task list container
    displayTask.appendChild(para);
  }

  static deleteTask(element) {}

  static clearFields() {
    document.querySelector("#form-task-name").value = "";
    // document.querySelector('#task-list').innerHTML = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
  }

  static addTask(a_task) {
    const tasks = Store.getTasks();
    tasks.push(a_task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static removeTask() {}
}

// Event : Display Tasks
document.addEventListener("DOMContentLoaded", UI.displayTasks);

// Event: Add a task
document.querySelector(".form-task").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#form-task-name").value;

  const task = new Task(title);

  // ToDo: Add task to UI
  UI.addTaskToList(task);

  // Add task to store
  Store.addTask(task);

  // Clear fields
  UI.clearFields();
});

// Event: Remove a task
document.querySelector("#task-list").addEventListener("click", (e) => {
  // Remove task from UI
  UI.deleteTask(e.target);

  // Remove task from store
  Store.removeTask();
});
