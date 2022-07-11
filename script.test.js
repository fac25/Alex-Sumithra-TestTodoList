//Test ran before JS had loaded the dom and checkbox was returning null/undefined
window.addEventListener("DOMContentLoaded", (event) => {
  //Imiatating a user clicking the checkbox
  test("Checking an entry marks it as complete", () => {
    //Make an array of all checkboxes
    const checkbox = Array.from(document.getElementsByClassName("checkbox"));
    if (checkbox.length === 0) {
      console.log("Add a note");
    } else {
      //Imitate the user clicking the box
      checkbox[0].click();

      //When clicked the checkbox.checked should be true
      equal(checkbox[0].checked, true);

      //Unclick so on load the checkbox isn't clicked
      checkbox[0].click();
    }
  });

  /* test("Deleting an entry removes it from the list", () => {
    const deleteLink = Array.from(document.getElementsByTagName("a"));
    const notes = Array.from(document.getElementsByClassName("notes"));
    deleteLink[0].click(notes.splice(0, 1), equal(notes.length, 0));
  });
  */
});
