
const input = document.querySelector("#form-task-name");
const saveBtn = document.querySelector("#form-add-btn");
const taskList = document.querySelector("#task-list");

// Function to delete the task
function cleanUpTest(){
  const delBtns = document.querySelectorAll(".delete");
  delBtns[0].click();
}

// Function to create a task
function createTestTask(text){
  input.value = text;
  saveBtn.click();
}

//=====================================================================================
// Check Add
//=====================================================================================

describe("Add tasks to the list", () => {

  test("New task added to the list", () => {
    createTestTask("Task1");  
    equal(taskList.children.length, 1,"One task added and the list length equals 1");
    cleanUpTest();
  });

  test("New task added to the local storage", () => {
    createTestTask("Task1");
    const tasks = store.getTasks();
    equal(tasks[tasks.length-1].title, "Task1","Task added to the local storage");
    cleanUpTest();
  });

  test("Test empty task name", () => {
    createTestTask("");
    const err = document.querySelector("#errorMsg");
    equal(err.textContent,"Please enter a task name","Display error message for empty task name");
  });

  test("Form input fields are cleared after adding new task", () => {
    createTestTask("Task1");
    equal(input.value, "","Input fields are cleared");
    cleanUpTest();
  });
  
});

//=====================================================================================
// Check Delete
//=====================================================================================
describe("Delete task from the list", () => {

  test("Clicking delete will remove a task from the list", () => {
    
    createTestTask("Task1");

    const delBtns = document.querySelectorAll(".delete");
    delBtns[0].click();

    // Tried to do the way Oli did in class today but I could only find offsetParent as the difference between if it's deleted or not
    equal(delBtns[0].offsetParent, null,"Task deleted from the list");
    // document.querySelector("#form-task-name").innerHTML = "";
  });

  test("Clicking delete will remove the task from the local storage", () => {

    createTestTask("Task1");

    const delBtns = document.querySelectorAll(".delete");
    delBtns[0].click();

    const tasks = store.getTasks();

    notEqual(tasks[tasks.length-1].title, "Task1","Task deleted from the local storage");

  });

});

//=====================================================================================
// Check Checkbox
//=====================================================================================

describe("Checking checkbox", () => {

  // Imiatating a user clicking the checkbox
  test("Checking an entry marks it as complete", () => {
    
    createTestTask("Task1");
    
    //Make an array of all checkboxes
    const checkbox = document.getElementsByClassName("checkbox");

    //Imitate the user clicking the box
    checkbox[0].click();

    //When clicked the checkbox.checked should be true
    equal(checkbox[0].checked, true,"Checkbox is checked when clicked");

    //Unclick so on load the checkbox isn't clicked
    checkbox[0].click();
    cleanUpTest();
  });

  test("Strike-through when the checkbox is clicked", () => {
    createTestTask("Task1");
    
    //Make an array of all checkboxes
    const checkboxes = document.querySelectorAll(".checkbox");

    //Imitate the user clicking the box
    checkboxes[0].click();
    const style = checkboxes[0].parentElement.parentElement.children[1].style.textDecoration;

    equal(style, "line-through", "Task style is set to line-through");

    //Unclick so on load the checkbox isn't clicked
    checkboxes[0].click();
    cleanUpTest();

  });

  test("Remove strike-through when the checkbox is double clicked", () => {
    createTestTask("Task1");
    
    //Make an array of all checkboxes
    const checkboxes = document.querySelectorAll(".checkbox");

    // Do double click to make sure the strike-through style is removed
    checkboxes[0].click();
    checkboxes[0].click();

    const style = checkboxes[0].parentElement.parentElement.children[1].style.textDecoration;

    equal(style, "none", "Double clicking the checkbox removes the line-through style");
    
    cleanUpTest();

  });

});

//=====================================================================================
// Check Filter
//=====================================================================================

describe("Checking filter", () => {

  test("Completed - filters completed tasks", ()=>{

    // Add test task
    createTestTask("Task1");
    
    //Make an array of all checkboxes
    const checkboxes = document.getElementsByClassName("checkbox");

    //Imitate the user clicking the box
    checkboxes[0].click();

    // Click completed
    const btn = document.querySelector("#completed");
    btn.click();

    if(checkboxes[0].checked){
      equal(taskList.children.length, 1,"Completed filters out the checked task");
    }

    //Unclick so on load the checkbox isn't clicked
    checkboxes[0].click();
    cleanUpTest();

  });

  test("Active filters pending tasks", ()=>{

    // Add test tasks
    createTestTask("Active Task"); 
    createTestTask("Finished Task");
    
    //Make an array of all checkboxes
    const checkboxes = document.getElementsByClassName("checkbox");

    // Mark finished task as finished
    checkboxes[1].click();

    // Click Active
    const btn = document.querySelector("#active");
    btn.click();

    let activeTaskLength = 0;
    for(let task of taskList.children){
      if(task.style.display === "table-row" ){
        activeTaskLength++;
      }
    }

    equal(activeTaskLength, 1,"Active showing the pending tasks");
 
    checkboxes[1].click();
    cleanUpTest();
    cleanUpTest();

  });

  test("All shows all the tasks", ()=>{

    // Add test tasks
    createTestTask("Active Task"); 
    createTestTask("Finished Task");
    
    //Make an array of all checkboxes
    const checkboxes = document.getElementsByClassName("checkbox");

    // Mark finished task as finished
    checkboxes[1].click();

    // Click Active
    const btn = document.querySelector("#all");
    btn.click();

    equal(taskList.children.length, 2,"All shows both active and finished task");

    checkboxes[1].click();
    cleanUpTest();
    cleanUpTest();
    
  });
});