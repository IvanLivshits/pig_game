'use strict';

function randomDice() {
  return Math.trunc(Math.random() * 6) + 1;
}

//Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const Pl0El = document.querySelector('.player--0');
const Pl1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

//Starting conditions
const start = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  Pl0El.classList.remove('player--winner');
  Pl1El.classList.remove('player--winner');
  Pl0El.classList.add('player--active');
  Pl1El.classList.remove('player--active');
  document.getElementById('name--0').textContent = 'PLAYER 1';
  document.getElementById('name--1').textContent = 'PLAYER 2';
};
start();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  Pl0El.classList.toggle('player--active');
  Pl1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  const dice = randomDice();

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
  }
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
    document.getElementById(`name--${activePlayer}`).textContent = `🏆 PLAYER ${
      activePlayer + 1
    } WIN! 🏆`;
    document.getElementById(`name--${activePlayer}`).style.textAlign = 'center';
    document
      .querySelector(`player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', start);
