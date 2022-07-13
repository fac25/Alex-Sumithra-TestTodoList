//Imiatating a user clicking the checkbox
test("Checking an entry marks it as complete", () => {
  //Make an array of all checkboxes
  const input = document.querySelector("#form-task-name");
  input.value = "text";
  document.querySelector("input[type ='submit']").click();
  const checkbox = document.getElementsByClassName("checkbox");

  //Imitate the user clicking the box
  checkbox[0].click();

  //When clicked the checkbox.checked should be true
  equal(checkbox[0].checked, true);

  //Unclick so on load the checkbox isn't clicked
  checkbox[0].click();
  const deleted = document.querySelectorAll(".delete");
  deleted[0].click();
});

test("Deleting an entry removes it from the list", () => {
  const input = document.querySelector("#form-task-name");
  input.value = "text";
  document.querySelector("input[type ='submit']").click();
  const deleted = document.querySelectorAll(".delete");
  deleted[0].click();
  //Tried to do the way Oli did in class today but I could only find offsetParent as the difference between if it's deleted or not
  equal(deleted[0].offsetParent, null);
  document.querySelector("#form-task-name").innerHTML = "";
});

// Check adding tasks to the list
test("Add tasks to the list", () => {
  const input = document.querySelector("#form-task-name");
  input.value = "Test Task";
  document.querySelector("input[type ='submit']").click();
  const todos = document.querySelectorAll("#task-list");
  equal(todos.length, 1);

  // Do a clean up for next test.
  const deleted = document.querySelectorAll(".delete");
  deleted[0].click();
});