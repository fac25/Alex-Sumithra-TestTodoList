//Test ran before JS had loaded the dom and checkbox was returning null/undefined
window.addEventListener("DOMContentLoaded", (event) => {
  //Imiatating a user clicking the checkbox
  test("Checking an entry marks it as complete", () => {
    //Make an array of all checkboxes
    const checkbox = Array.from(document.getElementsByClassName("checkbox"));
    //Imitate the user clicking the box
    checkbox[0].click();
    checkbox[1].click();
    //When clicked the checkbox.checked should be true
    equal(checkbox[0].checked, true);
    equal(checkbox[1].checked, true);
    //Unclick so on load the checkbox isn't clicked
    checkbox[0].click();
    checkbox[1].click();
  });
});
