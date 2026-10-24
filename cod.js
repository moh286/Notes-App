let inputNotes = document.getElementById("input");
let butNotes = document.getElementById("add");
let showNotes = document.getElementById("notes");
let searchNotes = document.getElementById("search");

let notesArray = [];
if (localStorage.getItem("notes")) {
  notesArray = JSON.parse(localStorage.getItem("notes"));
  addToPage(notesArray);
}
butNotes.onclick = function () {
  let inputText = inputNotes.value;
  if (inputText !== "") {
    let notes = {
      id: Date.now(),
      content: inputText,
    };
    notesArray.push(notes);
    addToPage(notesArray);
    addToLocalStorage(notesArray);

    inputNotes.value = "";
  }
};

showNotes.addEventListener("click", function (e) {
  if (e.target.tagName === "SPAN") {
    let id = e.target.parentElement.getAttribute("data-id");
    notesArray = notesArray.filter((notes) => notes.id != id);
    addToLocalStorage(notesArray);
    // e.target.parentElement.remove();
    addToPage(notesArray);
  }
  if (e.target.tagName === "P") {
    let p = e.target;
    let textOld = p.textContent;
    let inputEdit = document.createElement("input");
    inputEdit.value = textOld;
    p.replaceWith(inputEdit);
    inputEdit.focus();
    inputEdit.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        let nowText = inputEdit.value;
        let id = inputEdit.parentElement.getAttribute("data-id");

        notesArray.forEach((notes) => {
          if (notes.id == id) {
            notes.content = nowText;
          }
        });
        addToLocalStorage(notesArray);
        addToPage(notesArray);
      }
    });
  }
});

searchNotes.addEventListener("input", function () {
  let value = searchNotes.value.toLowerCase();
  let filtered = notesArray.filter((notes) =>
    notes.content.toLowerCase().includes(value),
  );
  addToPage(filtered);
});

function addToPage(array) {
  showNotes.innerHTML = "";
  array.forEach((notes) => {
    let div = document.createElement("div");
    div.setAttribute("data-id", notes.id);
    div.className = "note";

    let p = document.createElement("p");
    p.textContent = notes.content;
    let span = document.createElement("span");
    span.textContent = "Delete";
    span.className = "delete";
    div.appendChild(p);
    div.appendChild(span);
    showNotes.appendChild(div);
  });
}

function addToLocalStorage(array) {
  localStorage.setItem("notes", JSON.stringify(array));
}
