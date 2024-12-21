let gameBoard = ["", "", "", "", "", "", "", "", ""];

//game variables
let playerOne = "X";
let playerTwo = "O";
let playerOneName = "";
let playerTwoName = "";
let playerOneTurn = true;
let playerTwoTurn = false;
let gameOver = false;


const gameBoardEl = document.getElementById("gameboard-container");
const starBtnEl = document.getElementById("start");
const cellEl = document.querySelectorAll(".cell");
const contentContainerEl=document.getElementById('content-container');
//get ask name container
const askNameEl = document.getElementById("ask-name");

//variable highlight for indicating player turn
const variableXEl = document.getElementById("player-variablex");
const variableOEl = document.getElementById("player-variableo");


//show the ask naem container and blur the content 
function showAskName(){
  askNameEl.style.display='flex';
  contentContainerEl.classList.add('blur')
  
}

//hide the ask naem container and blur the content 
function hideAskName(){
  askNameEl.style.display='none';
  contentContainerEl.classList.remove('blur')
  
}

showAskName();

//logic for display name module

starBtnEl.addEventListener("click", () => {
  hideAskName()
  playerOneName = document.getElementById("user1").value || "Player-1";
  playerTwoName = document.getElementById("user2").value || "Player-2";

  document.querySelector('.player1-name span').textContent=playerOneName;
  document.querySelector('.player2-name span').textContent=playerTwoName;

  askNameEl.style.display = "none";
  gameBoardEl.style.display = "grid";
});

//start the game
function startGame(dataIndex) {
  if (gameOver === false) {
    if (playerOneTurn && gameBoard[dataIndex] == "") {
      gameBoard[dataIndex] = playerOne;
      console.log(variableXEl.innerHTML);
      updatePlayerIndicator();
      playerOneTurn = false;
      playerTwoTurn = true;
    } else if (playerTwoTurn && gameBoard[dataIndex] == "") {
      gameBoard[dataIndex] = playerTwo;
      console.log(variableOEl.innerHTML);
      updatePlayerIndicator();
      playerOneTurn = true;
      playerTwoTurn = false;
    }

    return gameBoard;
  }
}

function updatePlayerIndicator() {
  if (playerOneTurn) {
    variableXEl.style.color = "white";
    variableOEl.style.color = "#ac3b61";
  } else {
    variableXEl.style.color = "#ac3b61";
    variableOEl.style.color = "white";
  }
}

function checkWin(board) {
  let playerWin = "";
  // check win for x or O

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontal win
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // vertical win
    [0, 4, 8],
    [2, 4, 6], // digonal win
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      playerWin += `${
        board[a] == "X" ? playerOneName : playerTwoName
      } has won the game!`;
      gameOver = true;
      return playerWin;
    } 
  }

  if (!board.includes("")){
    playerWin="It is a draw!"
    gameOver=true;
  }

  return playerWin;
}

//setting menu
const settingsEl = document.getElementById("settings-menu");
const gearIconEl = document.getElementById("gear-icon");
gearIconEl.addEventListener("click", () => {
  if (settingsEl.style.display == "flex") {
    settingsEl.style.display = "none";
    gearIconEl.classList.remove("active");
  } else {
    settingsEl.style.display = "flex";
    gearIconEl.classList.add("active");

    const restartEl = document.getElementById("restart");
    restartEl.addEventListener("click", () => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      playerOneTurn = true;
      playerTwoTurn = false;
      gameOver = false;
      variableOEl.style.color = "white";
      variableXEl.style.color = "white";

      cellEl.forEach((cell) => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "";
      });

      document.getElementById('player-win').innerHTML=""
    });

  }
});

//adding event listener to every cell

cellEl.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const dataIndex = e.target.getAttribute("data-index");

    if (gameBoard[dataIndex] === "" && !gameOver) {
      let board = startGame(dataIndex);

      if (board[dataIndex] === "X") {
        cell.style.backgroundColor = "#b39bc8";
        cell.innerHTML = board[dataIndex];
      } else if (board[dataIndex] === "O") {
        cell.style.backgroundColor = "#f172a1";
        cell.innerHTML = board[dataIndex];
      }
      //cell.innerHTML = board[dataIndex];

      const playerWin = checkWin(board);

      if (gameOver) {
        const displayWinner = document.getElementById("player-win");
        //console.log(playerWin);
        displayWinner.innerHTML = `${playerWin}`;
      }
    }
  });
});
