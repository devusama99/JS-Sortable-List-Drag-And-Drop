const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

const richestPeople = [
  "Jeff bezos",
  "Bill Gates",
  "Warren Buffet",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Elison",
  "Mark Zuckerburg",
  "Micheal Bloomberg",
  "Larry Page",
];

// Store List-items
const listItems = [];

let dragStartIndex;

createList();

// Insert List items into DOM
function createList() {
  [...richestPeople]
    .map((data) => ({
      value: data,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
    <span class='number'>${index + 1}</span>
    <div class='draggable' draggable='true'>
        <p class = 'person-name'>${person}</p>
        <i class="fas fa-grip-lines"></i>
    </div>
    `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  //   console.log("Event:", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragOver(e) {
  //   console.log("Event:", "dragover");
  e.preventDefault();
}
function dragDrop() {
  //   console.log("Event:", "drop");
  dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(from, to) {
  const itemOne = listItems[to].querySelector(".draggable");
  const itemTwo = listItems[from].querySelector(".draggable");

  listItems[from].appendChild(itemOne);
  listItems[to].appendChild(itemTwo);
}
function dragEnter() {
  //   console.log("Event:", "dragenter");
  this.classList.add("over");
}
function dragLeave() {
  //   console.log("Event:", "dragleave");
  this.classList.remove("over");
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
      listItem.classList.remove("right");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((listItem) => {
    listItem.addEventListener("dragover", dragOver);
    listItem.addEventListener("drop", dragDrop);
    listItem.addEventListener("dragenter", dragEnter);
    listItem.addEventListener("dragleave", dragLeave);
  });
}

checkBtn.addEventListener("click", checkOrder);
