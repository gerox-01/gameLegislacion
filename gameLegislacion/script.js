const solid = [
  {
    iconName: "house",
    solidName: "Amarillo",
    color: "#F1C40F"
  },
  {
    iconName: "house",
    solidName: "Azul",
    color: "#2980B9"
  },
  {
    iconName: "house",
    solidName: "Rojo",
    color: "#C0392B"
  },
  {
    iconName: "house",
    solidName: "Verde",
    color: "#27AE60"
  },
  {
    iconName: "house",
    solidName: "Blanco",
    color: "#BDC3C7"
  },
  {
    iconName: "flag",
    solidName: "Noruego",
    color: "#C0392B"
  },
  {
    iconName: "flag",
    solidName: "Danes",
    color: "#9B59B6"
  },
  {
    iconName: "flag",
    solidName: "Ingles",
    color: "#34495E"
  },
  {
    iconName: "flag",
    solidName: "Aleman",
    color: "#34495E"
  },
  {
    iconName: "flag",
    solidName: "Sueco",
    color: "#F1C40F"
  },
  {
    iconName: "droplet",
    solidName: "Agua",
    color: "#2980B9"
  },
  {
    iconName: "mug-hot",
    solidName: "Te",
    color: "#fd5c63"
  },
  {
    iconName: "blender",
    solidName: "Leche",
    color: "#333333"
  },
  {
    iconName: "mug-saucer",
    solidName: "Android",
    color: "#a4c639"
  },
  {
    iconName: "beer-mug-empty",
    solidName: "Cerveza",
    color: "#000000"
  },
  {
    iconName: "joint",
    solidName: "Dunhill",
    color: "#ff0000"
  },
  {
    iconName: "smoking",
    solidName: "blends",
    color: "#fd5c63"
  },
  {
    iconName: "joint",
    solidName: "pallmall",
    color: "#333333"
  },
  {
    iconName: "smoking",
    solidName: "prince",
    color: "#a4c639"
  },
  {
    iconName: "joint",
    solidName: "bluemaster",
    color: "#000000"
  },
  {
    iconName: "cat",
    solidName: "Gato",
    color: "#ff0000"
  },
  {
    iconName: "horse",
    solidName: "Caballo",
    color: "#fd5c63"
  },
  {
    iconName: "crow",
    solidName: "Pajaros",
    color: "#333333"
  },
  {
    iconName: "fish",
    solidName: "Pez",
    color: "#a4c639"
  },
  {
    iconName: "dog",
    solidName: "Perro",
    color: "#000000"
  }
];
let correct = 0;
let total = 0;
const totalDraggableItems = 25;
const totalMatchingPairs = 25; // Should be <= totalDraggableItems

const scoreSection = document.querySelector(".score");
const correctSpan = scoreSection.querySelector(".correct");
const totalSpan = scoreSection.querySelector(".total");
const playAgainBtn = scoreSection.querySelector("#play-again-btn");

const draggableItems = document.querySelector(".draggable-items");
const matchingPairs = document.querySelector(".matching-pairs");
let draggableElements;
let droppableElements;

initiateGame();

function initiateGame() {
  const randomDraggableSolids = generateRandomItemsArray(totalDraggableItems, solid);
  const randomDroppableSolids = totalMatchingPairs < totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableSolids) : randomDraggableSolids;
  const alphabeticallySortedRandomDroppableSolids = [...randomDroppableSolids].sort((a, b) => a.solidName.toLowerCase().localeCompare(b.solidName.toLowerCase()));

  // Create "draggable-items" and append to DOM
  for (let i = 0; i < randomDraggableSolids.length; i++) {
    draggableItems.insertAdjacentHTML("beforeend", `
      <i class="fas fa-${randomDraggableSolids[i].iconName} draggable" draggable="true" style="color: ${randomDraggableSolids[i].color};" id="${randomDraggableSolids[i].iconName}"></i>
    `);
  }


  // Create "matching-pairs" and append to DOM
  for (let i = 0; i < alphabeticallySortedRandomDroppableSolids.length; i++) {
    matchingPairs.insertAdjacentHTML("beforeend", `
      <div class="matching-pair">
        <span class="droppable" data-solid="${alphabeticallySortedRandomDroppableSolids[i].iconName}"></span>
      </div>
    `);
  }

  draggableElements = document.querySelectorAll(".draggable");
  droppableElements = document.querySelectorAll(".droppable");

  draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
    // elem.addEventListener("drag", drag);
    // elem.addEventListener("dragend", dragEnd);
  });

  droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
  });
}

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // or "text/plain"
}

//Events fired on the drop target

function dragEnter(event) {
  if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.preventDefault();
  }
}

function dragLeave(event) {
  if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableElementSolid = event.dataTransfer.getData("text");
  const droppableElementSolid = event.target.getAttribute("data-solid");
  const isCorrectMatching = draggableElementSolid === droppableElementSolid;
  total++;
  if (isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementSolid);
    event.target.classList.add("dropped");
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.innerHTML = `<i class="fas fa-${draggableElementSolid}" style="color: ${draggableElement.style.color};"></i>`;
    correct++;
  }
  scoreSection.style.opacity = 0;
  setTimeout(() => {
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    scoreSection.style.opacity = 1;
  }, 200);
  if (correct === Math.min(totalMatchingPairs, totalDraggableItems)) { // Game Over!!
    playAgainBtn.style.display = "block";
    setTimeout(() => {
      playAgainBtn.classList.add("play-again-btn-entrance");
    }, 200);
  }
}

// Other Event Listeners
playAgainBtn.addEventListener("click", playAgainBtnClick);
function playAgainBtnClick() {
  playAgainBtn.classList.remove("play-again-btn-entrance");
  correct = 0;
  total = 0;
  draggableItems.style.opacity = 0;
  matchingPairs.style.opacity = 0;
  setTimeout(() => {
    scoreSection.style.opacity = 0;
  }, 100);
  setTimeout(() => {
    playAgainBtn.style.display = "none";
    while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
    while (matchingPairs.firstChild) matchingPairs.removeChild(matchingPairs.firstChild);
    initiateGame();
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    draggableItems.style.opacity = 1;
    matchingPairs.style.opacity = 1;
    scoreSection.style.opacity = 1;
  }, 500);
}

// Auxiliary functions
function generateRandomItemsArray(n, originalArray) {
  let res = [];
  let clonedArray = [...originalArray];
  if (n > clonedArray.length) n = clonedArray.length;
  for (let i = 1; i <= n; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    res.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  return res;
}