// Task Class: Represents a Task
class Task {
  constructor(title) {
    this.title = title;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayTasks() {
    const tasks = Store.getTasks();
    tasks.forEach((task) => UI.addTaskToList(task));
  }

  static addTaskToList(task) {
    const container = document.querySelector("#task-list");

    const tasks = document.createElement("tr");

    tasks.innerHTML = `<td>${task.title}</td>
    <td><a href="#" class="delete">X</a></td>`;

    container.appendChild(tasks);
  }

  static deleteTask(element) {
    console.log(element);
  }

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
