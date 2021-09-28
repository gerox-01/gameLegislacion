const solid = [
  {
    iconName: "house",
    solidName: "A",
    solidN: "Amarillo",
    color: "#F1C40F"
  },
  {
    iconName: "house-chimney",
    solidName: "B",
    solidN: "Azul",
    color: "#2980B9"
  },
  {
    iconName: "house-crack",
    solidName: "C",
    solidN: "Rojo",
    color: "#C0392B"
  },
  {
    iconName: "house-laptop",
    solidName: "D",
    solidN: "Verde",    
    color: "#27AE60"
  },
  {
    iconName: "house-user",
    solidName: "E",
    solidN: "Blanco",  
    color: "#85929E"
  },
  {
    iconName: "flag",
    solidName: "F",
    solidN: "Noruego",
    color: "#C0392B"
  },
  {
    iconName: "flag-checkered",
    solidName: "G",
    solidN: "Danes",
    color: "#9B59B6"
  },
  {
    iconName: "flag-usa",
    solidName: "H",
    solidN: "Ingles",
    color: "#34495E"
  },
  {
    iconName: "font-awesome",
    solidName: "I",
    solidN: "Aleman",
    color: "#34495E"
  },
  {
    iconName: "shirt",
    solidName: "J",
    solidN: "Sueco",
    color: "#F1C40F"
  },
  {
    iconName: "droplet",
    solidName: "K",
    solidN: "Agua",
    color: "#2980B9"
  },
  {
    iconName: "mug-hot",
    solidName: "L",
    solidN: "Te",
    color: "#fd5c63"
  },
  {
    iconName: "blender",
    solidName: "M",
    solidN: "Leche",
    color: "#333333"
  },
  {
    iconName: "mug-saucer",
    solidName: "N",
    solidN: "Cafe",
    color: "#a4c639"
  },
  {
    iconName: "beer-mug-empty",
    solidName: "O",
    solidN: "Cerveza",
    color: "#000000"
  },
  {
    iconName: "joint",
    solidName: "P",
    solidN: "Dunhill",
    color: "#ff0000"
  },
  {
    iconName: "smoking",
    solidName: "Q",
    solidN: "blends",
    color: "#fd5c63"
  },
  {
    iconName: "ban-smoking",
    solidName: "R",
    solidN: "pallmall",
    color: "#333333"
  },
  {
    iconName: "bong",
    solidName: "S",
    solidN: "prince",
    color: "#a4c639"
  },
  {
    iconName: "smog",
    solidName: "T",
    solidN: "bluemaster",
    color: "#000000"
  },
  {
    iconName: "cat",
    solidName: "U",
    solidN: "Gato",
    color: "#ff0000"
  },
  {
    iconName: "horse",
    solidName: "V",
    solidN: "Caballo",
    color: "#fd5c63"
  },
  {
    iconName: "crow",
    solidName: "W",
    solidN: "Pajaros",
    color: "#333333"
  },
  {
    iconName: "fish",
    solidName: "X",
    solidN: "Pez",
    color: "#a4c639"
  },
  {
    iconName: "dog",
    solidName: "Y",
    solidN: "Perro",
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
      <i class="fas fa-${randomDraggableSolids[i].iconName} draggable" draggable="true" style="color: ${randomDraggableSolids[i].color};" id="${randomDraggableSolids[i].iconName}">
      <span class="letter-span">${randomDraggableSolids[i].solidN}</span>
      </i>
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


function CustomAlert(){
  this.alert = function(message,title){
    document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    
    let winH = window.innerHeight;
    dialogoverlay.style.height = winH+"px";
    
    dialogbox.style.top = "100px";

    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    
    document.getElementById('dialogboxhead').style.display = 'block';

    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="customAlert.nice()">OK</button>';
  }
  
  this.ok = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}

let customAlert = new CustomAlert();