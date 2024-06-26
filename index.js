// Savoir quel joueur doit jouer
let currentPlayer = 1;
// Vérifier si un joueur a gagné
let isGameWon = false;
// Vérifier si la partie est finie
let isGameFinished = false;
// La grille du morpion
let grid = [0, 0, 0, 
            0, 0, 0, 
            0, 0, 0];

const player1 = `<i class="fa-solid fa-x"></i>`;
const player2 = `<i class="fa-solid fa-o"></i>`;

const score = {
    player1: 0,
    player2: 0,
    draw: 0
}

function init(){
    addListenerToCells()
    initScore()

    // Ajoute la fonction qui permet de reset la partie
    // document.querySelector('button').addEventListener('click', newGame)
    document.querySelector('#startgame').addEventListener('click', startGame)
}
init()

function initScore(){
    document.querySelector('#j1').innerHTML = score.player1
    document.querySelector('#draw').innerHTML = score.draw
    document.querySelector('#j2').innerHTML = score.player2
}


// On doit faire en sorte que les cases soient cliquables
function addListenerToCells(){
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', (e) => {
            // On ajoute le symbole du joueur si la case est vide

            // On vérifie si la case est vide
            if(grid[index] !== 0 || isGameWon || isGameFinished){
                return;
            }

            grid[index] = currentPlayer;
            displayPlayerSymbol(index)
            

            // On cherche si quelqu'un à gagné
            checkIfSomeoneWon()
           
        });
    });
}

// Fonction qui permet d'afficher le symbole du joueur sur le DOM
function displayPlayerSymbol(index){
    document.querySelectorAll(".cell")[index].innerHTML = currentPlayer === 1 ? player1 : player2;
}

// On doit vérifier s'il y a un vainqueur
function checkIfSomeoneWon(){

    // Définir les combinaisons gagnantes
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
        [0, 4, 8], [2, 4, 6] // Diagonales
    ]

    // Fonction qui vérifie si une combinaison données est gagnante
    const isWinningCombination = (combination) => 
        combination.every(index => grid[index] === currentPlayer)

    // On vérifie si une combinaison gagnante est présente
    isGameWon = winningCombinations.some(isWinningCombination);
    if(isGameWon) {
        if(currentPlayer === 1){
            score.player1++
        } else  {
            score.player2++
        }
    }
   
    // On vérifie si la partie est finie
    isGameFinished = grid.every(cell => cell !== 0);

    // Si personne n'a gagné et que le jeu n'est PAS terminé : on change le joueur
    if(!isGameWon && !isGameFinished){
        changePlayer()
    }

    // Si le jeu est terminé sans vainqueur
    if(isGameFinished && !isGameWon){
        score.draw++
    }

    // Fonction qui permet de mettre à jour les scores
    initScore()
}

// Fonction qui pemet de changer le tour du joueur
function changePlayer(){
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// Fonction qui permet de jouer avec l'IA Debilla
function playWithDebilla(){

    // On choisi un nombre alétatoire entre 0 et 8
    let randomIndex = Math.floor(Math.random() * 9);
    console.log('randomIndex ', randomIndex)

    // On vérifie si la case est vide
    if(grid[randomIndex] === 0){
        // La case est vide, on peut jouer
        grid[randomIndex] = currentPlayer;

        // On affiche le symbole du joueur sur le DOM
        displayPlayerSymbol(randomIndex)
        // On test pour savoir si quelqu'un a gagné
        checkIfSomeoneWon()
    } else {
        // La case n'est pas vide, on recommence
        playWithDebilla()
    }
}

// Fonction qui permet de recommencer une partie
function newGame(){
    currentPlayer = 1;
    isGameWon = false;
    isGameFinished = false;
    grid = [0, 0, 0, 
            0, 0, 0, 
            0, 0, 0];

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
}

// Fonction qui permet de démarrer le jeu avec l'utilisation de l'IA
function startGame(){

    const timer = setInterval(() => {
        // On fait appel à la fonction Debilla
        if(!isGameWon && !isGameFinished){
            playWithDebilla()
        }
        if(isGameWon || isGameFinished){
            // Arrête le timer
            clearInterval(timer)

            // Redémarre la partie au bout de Xms
            setTimeout(() => {
                newGame()
                startGame()
            },500 + Math.floor(Math.random() * 500))
        }

    }, 500 + Math.floor(Math.random() * 500))
    
    document.querySelector('#stopgame').removeEventListener('click', startGame)
    document.querySelector('#stopgame').addEventListener('click', () => {
        clearInterval(timer)
        // isGameFinished = true;
    })

    document.querySelector('#continuegame').removeEventListener('click', startGame)
    document.querySelector('#continuegame').addEventListener('click', () => {
        startGame()
    })

    

    // // Si personne n'a gagné, on relance le jeu
    // if(!isGameWon && !isGameFinished){
    //     // On relance le jeu après un délai de 500ms à 1s
    //     setTimeout(startGame, delay) 
    // }

    // // Si le jeu est terminé, on relance une nouvelle partie
    // if(isGameWon || isGameFinished){
    //     newGame()
    //     startGame()
    // }

}