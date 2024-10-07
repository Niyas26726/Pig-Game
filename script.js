// Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const name0 = document.querySelector('.name0');
const name1 = document.querySelector('.name1');

const dice = document.querySelector('.dice');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;

let currPlayer = 0;
let holdScore0 = 0;
let holdScore1 = 0;

const targrtScore = 100;

// Start The Game
startGame();

// Start Game fun
function startGame() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');

  player0.classList.remove('payer--active')
  player0.classList.remove('player--winner')
  name0.classList.add('hidden');

  player1.classList.add('payer--active')
  player1.classList.remove('player--winner')
  name1.classList.add('hidden');

  currPlayer = 0;
  holdScore0 = 0;
  holdScore1 = 0;

  btnRoll.disabled = false;
  btnHold.disabled = false;
}

// Roll Dice fun
let rollDice = function () {
  let num = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `dice-${num}.png`;
  if (num && num !== 1) {
    updateScore(num);
  } else {
    scoreZero();
    currPlayer = changePlayer(currPlayer);
  }
};

// Update Current Score fun
function updateScore(score) {
  if (currPlayer === 0) {
    current0.textContent = Number(current0.textContent) + score;
  } else {
    current1.textContent = Number(current1.textContent) + score;
  }
};

// Change Player fun
function changePlayer(currPlayer) {
  if (player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
  return currPlayer === 0 ? 1 : 0;
}

// Score Zero fun
function scoreZero() {
  if (currPlayer === 0) {
    current0.textContent = 0;
  } else {
    current1.textContent = 0;
  }
}

// Hold Score fun
function holdScore() {
  if (currPlayer == 0) {
    holdScore0 = current0.textContent || holdScore0;
    score0El.textContent = Number(score0El.textContent) + Number(holdScore0);
    holdScore0 = 0;
    if (score0El.textContent >= targrtScore) {
      playerWin(player0, name0);
    } else {
      scoreZero();
      currPlayer = changePlayer(currPlayer);
    }
  } else {
    holdScore1 = current1.textContent || holdScore1;
    score1El.textContent = Number(score1El.textContent) + Number(holdScore1);
    holdScore1 = 0;
    if (score1El.textContent >= targrtScore) {
      playerWin(player1, name1);
    } else {
      scoreZero();
      currPlayer = changePlayer(currPlayer);
    }
  }
}

// Player Win fun
function playerWin(player, name) {
  player.classList.remove('payer--active')
  player.classList.add('player--winner')
  name.classList.remove('hidden');
  btnRoll.disabled = true;
  btnHold.disabled = true;
}

// Event Handelling
btnNew.addEventListener('click', startGame);  // Start New Game
btnRoll.addEventListener('click', rollDice);  // Dice Roll
btnHold.addEventListener('click', holdScore); // Hold Score