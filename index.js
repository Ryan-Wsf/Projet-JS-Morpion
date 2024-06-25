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
    document.querySelector('button').addEventListener('click', newGame)
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
            cell.innerHTML = currentPlayer === 1 ? player1 : player2;

            // On cherche si quelqu'un à gagné
            checkIfSomeoneWon()
           
        });
    });
}

// On doit vérifier s'il y a un vainqueur
function checkIfSomeoneWon(){
    // On vérifie les lignes
    if( (grid[0] === grid[1] && grid[1] == grid[2] && grid[2] == currentPlayer) ||
        (grid[3] === grid[4] && grid[4] == grid[5] && grid[5] == currentPlayer) ||
        (grid[6] === grid[7] && grid[7] == grid[8] && grid[8] == currentPlayer) ||

        (grid[0] === grid[3] && grid[3] == grid[6] && grid[6] == currentPlayer) ||
        (grid[1] === grid[4] && grid[4] == grid[7] && grid[7] == currentPlayer) ||
        (grid[2] === grid[5] && grid[5] == grid[8] && grid[8] == currentPlayer) ||

        (grid[0] === grid[4] && grid[4] == grid[8] && grid[8] == currentPlayer) ||
        (grid[2] === grid[4] && grid[4] == grid[6] && grid[6] == currentPlayer)
    ){
        isGameWon = true;
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