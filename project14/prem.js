'use strict';
// All Selecting classes & id's
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
//----------------------------------//
// reset game
let currentScore, activePlayer, scores, playing;
const init = () => {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  playing = true;

  diceEl.classList.add('hidden');
  score0El.innerText = 0;
  score1El.innerText = 0;
  current0El.innerText = 0;
  current1El.innerText = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// Switch player
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).innerText = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//-------------------------//
// Rolling btn functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).innerText =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
// btn hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).innerText =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      const player0El = document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
// reset and new game functionality
btnNew.addEventListener('click', init);
