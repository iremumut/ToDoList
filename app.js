const list = document.querySelector("#list");
const form = document.querySelector("form");
const editBtns = document.querySelectorAll(".editbtn");
const deleteBtns = document.querySelectorAll(".deletebtn");

list.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    e.target.nodeName === "IMG" &&
    e.target.classList.contains("btn-delete")
  ) {
    e.path[2].remove();
  } else if (
    e.target.nodeName === "IMG" &&
    e.target.classList.contains("btn-edit")
  ) {
    editTask(e.path[2]);
  } else if (
    (e.target.nodeName = "BUTTON" && e.target.classList.contains("hidden-edit"))
  ) {
    approveEdit(e.path[1]);
  } else if (
    (e.target.nodeName = "IMG" && e.target.classList.contains("btn-check"))
  ) {
    checkButton(e.path);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = form.elements.task;
  if (task.value != "") {
    taskAdd(task);
  }
});

function checkButton(path) {
  el = path[1].children[0];
  arr = el.src.split("/");
  source = arr[arr.length - 1];
  path[2].children[0].classList.toggle("line-text");
  if (source == "check-empty.svg") {
    el.src = "check-fill.svg";
    console.log(path[2].children[0].classList);
  } else if (source == "check-fill.svg") {
    el.src = "check-empty.svg";
  }
}

function editTask(path) {
  div = path.children[0];
  path.children[1].setAttribute("hidden", "True");
  path.children[2].setAttribute("hidden", "True");
  path.children[3].setAttribute("hidden", "True");
  editBtn = path.children[4];
  editBtn.removeAttribute("hidden");
  div.classList.toggle("edit-div");
  div.setAttribute("contenteditable", "True");
}

function approveEdit(path) {
  div = path.children[0];
  path.children[1].removeAttribute("hidden");
  path.children[2].removeAttribute("hidden");
  path.children[3].removeAttribute("hidden");
  editBtn = path.children[4];
  editBtn.setAttribute("hidden", "True");
  div.classList.toggle("edit-div");
  div.setAttribute("contenteditable", "False");
}

function taskAdd(task) {
  const newli = document.createElement("LI");
  newli.innerHTML = `<div class="task" contenteditable="False">${task.value}</div>
                        <a class="checkbtn" href=""><img src="check-empty.svg" alt="check button" class="icon btn-check"></a>
                        <a class="editbtn" href=""> <img src="edit.svg" alt="edit button" class="icon btn-edit"> </a>
                        <a class="deletebtn" href=""> <img src="delete.svg" alt="delete button" class="icon btn-delete"></a>
                        <button hidden class="hidden-edit">Edit</button>`;
  list.append(newli);
  task.value = "";
}
