// Task object
function Task(title) {
  return { title };
}

// UI: Handle UI Tasks

const UI = {
  displayTasks() {
    const tasks = store.getTasks();
    tasks.forEach((task) => UI.addTaskToList(task));
  },

  addTaskToList(task) {
    const container = document.querySelector("#task-list");

    const tasks = document.createElement("tr");
    tasks.className = "notes";

    tasks.innerHTML = `
    <td><input class='checkbox' type=checkbox ></td>
    <td>${task.title}</td>
    <td><button href="#" class="delete">X</button></td>`;

    container.appendChild(tasks);
  },

  deleteTask(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  },

  clearFields() {
    document.querySelector("#form-task-name").value = "";
    // document.querySelector('#task-list').innerHTML = '';
  },
};

// Store: Handles Storage
const store = {
  getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
  },

  addTask(a_task) {
    const tasks = store.getTasks();
    tasks.push(a_task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    return tasks;
  },

  removeTask(deletedTask) {
    const tasks = store.getTasks();

    tasks.forEach((task, index) => {
      if (task.title === deletedTask) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },
};

// Event : Display Tasks
document.addEventListener("DOMContentLoaded", UI.displayTasks);

// Event: Add a task
document.querySelector(".form-task").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#form-task-name").value;

  if (title.trim().length === 0) {
    alert("Please enter a task name");
  } else {
    const task = Task(title);

    // ToDo: Add task to UI
    UI.addTaskToList(task);

    // Add task to store
    store.addTask(task);

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a task
document.querySelector("#task-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Remove task from UI
    UI.deleteTask(e.target);

    // Remove task from store
    store.removeTask(e.target.parentElement.previousElementSibling.textContent);
  }
});

// Display all tasks
document.getElementById("all").addEventListener("click", () => {
  const notes = document.getElementById("task-list").children;
  Array.from(notes).forEach((note) => {
    note.style.display = "block";
  });
});

// Display active tasks
document.getElementById("active").addEventListener("click", () => {
  const notes = document.getElementById("task-list").children;
  Array.from(notes).forEach((note) => {
    if (note.querySelector("input").checked) {
      note.style.display = "none";
    } else {
      note.style.display = "block";
    }
  });
});

//Display completed tasks
document.getElementById("completed").addEventListener("click", () => {
  const notes = document.getElementById("task-list").children;
  Array.from(notes).forEach((note) => {
    if (note.querySelector("input").checked) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});
