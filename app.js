console.log('campominato')

// seleziona container griglia
const gridContainer = document.getElementById('container')

//pulsanti difficoltà
const easyBttn = document.getElementById('easy')
const mediumBttn = document.getElementById('medium')
const hardBttn = document.getElementById('hard')

let difficultNum = ''
// PUNTEGGIO
let points = 0

// NOTIFICHE VITTORIA O SCONFITTA
const winAlert = document.getElementById('win')
const loseAlert = document.getElementById('lose')

//aggiungiamo funzioni ai pulsanti

easyBttn.addEventListener('click', 
 function() {
   difficultNum = 100
   points = 0
   loseAlert.style.display = 'none'
   winAlert.style.display = 'none'

   gridContainer.innerHTML = ''

   gridDifficult(difficultNum, "squareEasy")

   squareClick('[class^="square"]', 'bombPlace')

 }
)

mediumBttn.addEventListener('click', 
 function() {
   difficultNum = 81
   points = 0
   loseAlert.style.display = 'none'
   winAlert.style.display = 'none'

   gridContainer.innerHTML = ''

   gridDifficult(difficultNum, "squareMedium")

   squareClick('[class^="square"]', 'bombPlace')

 }
)

hardBttn.addEventListener('click', 
 function() {
   difficultNum = 49
   points = 0
   loseAlert.style.display = 'none'
   winAlert.style.display = 'none'

   gridContainer.innerHTML = ''

   gridDifficult(difficultNum, "squareHard")

   squareClick('[class^="square"]', 'bombPlace')

 }
)

//GENERIAMO IL QUADRATO
function squareGenerator(x, y) {
    let gridSquare = document.createElement(x)
    gridSquare.classList.add(y)
    return gridSquare
}

//generiamo la griglia basata sulla difficoltà

function gridDifficult(x,y) {
  for (let i= 0; i < x; i++) {
    let newEl = squareGenerator("div", y)
    gridContainer.append(newEl)
  }


  //generiamo i singoli quadrati numerati
  let squareSelector = document.querySelectorAll('[class^="square"]');
    let squareArr = [];
    for (let i = 0; i < squareSelector.length; i++) {
        squareSelector[i].innerText = i + 1;
        squareArr.push(i + 1);
    }
    console.log(squareSelector);

    //generatore random array per bombe
    let bombArray = []
    while (bombArray.length < 16) { //numero di bombe previste
        let bombNum = Math.floor(Math.random() * difficultNum) + 1
        if (bombArray.includes(bombNum) == false ) {
            bombArray.push(bombNum)
        }

    }
   console.log(bombArray)
}

