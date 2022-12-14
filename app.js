console.log('campominato')

// seleziona container griglia
const gridContainer = document.getElementById('container');

// seleziona bottoni selezione difficoltÃ 
const easyBttn = document.getElementById("easy");
const mediumBttn = document.getElementById("medium");
const hardBttn = document.getElementById("hard");

let difficultNum = '';

let points = 0;

// alert vittoria e sconfitta
const loseAlert = document.getElementById('lose');
const winAlert = document.getElementById('win');

easyBttn.addEventListener('click', 
    function() {
        difficultNum = 100;
        points = 0;
        loseAlert.style.display = 'none';
        winAlert.style.display = 'none';

        gridContainer.innerHTML = "";

        gridDifficult(difficultNum, "squareEasy")

        squareClick('[class^="square"]', 'bombPlace')
    }
);

mediumBttn.addEventListener('click', 
    function() {
        difficultNum = 81;
        points = 0;
        loseAlert.style.display = 'none';
        winAlert.style.display = 'none';

        gridContainer.innerHTML = "";

        gridDifficult(difficultNum, "squareMedium") 

        squareClick('[class^="square"]', 'bombPlace')
    }
    
);

hardBttn.addEventListener('click', 
    function() {
        difficultNum = 49;
        points = 0;
        loseAlert.style.display = 'none';
        winAlert.style.display = 'none';

        gridContainer.innerHTML = "";

        gridDifficult(difficultNum, "squareHard")

        squareClick('[class^="square"]', 'bombPlace')
    }
);


// genera il quadrato
function squareGenerator(x, y) {
    let gridSquare = document.createElement(x);
    gridSquare.classList.add(y);
    return gridSquare
}

// genera la griglia di quadrati a seconda della difficoltÃ 
function gridDifficult(x, y) {
    for (let i = 0; i < x; i++) {
        let newElem = squareGenerator("div", y);
        gridContainer.appendChild(newElem);
    }

    // genera i quadrati con il numero all'interno
    let squareSelector = document.querySelectorAll('[class^="square"]');
    let squareArr = [];
    for (let i = 0; i < squareSelector.length; i++) {
        squareSelector[i].innerText = i + 1;
        squareArr.push(i + 1);
    }
    console.log(squareSelector);

    // genera l'array di bombe
    let bombArray = [];
    while (bombArray.length < 16) {
        let bombNum = Math.floor(Math.random() * difficultNum) + 1;
        if (bombArray.includes(bombNum) == false) {
            bombArray.push(bombNum);
        }
    }
    console.log(bombArray);

    // se il quadrato ha un numero presente nell'array di bombe allora imposto una classe placeholder NON ANCORA COPIATA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (i = 0; i < squareArr.length; i++) {
        if (bombArray.includes(squareArr[i]))
        squareSelector[i].classList.add('bombPlace');
    }
}



// click sul singolo quadratino
function squareClick(x, y) {
    let squareSelector = document.querySelectorAll(x);
    let bombSelector = [];
    console.log(squareSelector);

    
    
    // se il quadratino ha la classe placeholder della bomba lo metto in un array 
    for (let i = 0; i < squareSelector.length; i++) {
        if (squareSelector[i].classList.contains(y)) {
            bombSelector.push(squareSelector[i]);
        }
    }
    
    console.log(bombSelector);


    for (let i = 0; i < squareSelector.length; i++) {

        // funzione per i quadratini normali, dopo essere stato cliccato una volta blocca il click, evitando che il punteggio salga ricliccando sullo stesso quadratino
        function activeClick() {
            squareSelector[i].classList.add('active');
            points++

            if (points == difficultNum - 16) {
                winAlert.style.display = 'block';
                winAlert.innerHTML = `Hai vinto! &#9996 Hai evitato tutte le bombe con successo ottenendo ${points} punti. GRANDE!`
            }
            
            console.log(points);
            squareSelector[i].removeEventListener('click', activeClick);
        
        }

        if (squareSelector[i].classList.contains(y)) {
            // se il quadratino cliccato ha la classe placeholder imposto la classe bomb che fa diventare lo sfondo rosso a tutti i quadratini bomba 
            squareSelector[i].addEventListener('click',
                function() {
                    for (let i = 0; i < bombSelector.length; i++) {
                        bombSelector[i].classList.add('bomb');
                    }
                    loseAlert.style.display = 'block';
                    loseAlert.innerHTML = `Hai perso! &#9760 Il tuo punteggio Ã¨ ${points}`
                }
            );
        } else {
            // se il quadratino cliccato non Ã¨ una bomba cambio lo sfondo in azzurro e aumento il contatore dei punti (richiama la funzione creata all'inizio del ciclo)
            squareSelector[i].addEventListener('click', activeClick);
        }
    }

}

