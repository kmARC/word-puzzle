import fp from 'lodash/fp';

import { shuffle, toKeys, updateKeys } from '../Game';

/**
 * @class
 * @classdesc Controller for the Game component.
 * All members are bound to the `$ctrl` object on `<game-component>`
 */
function GameController(
  $document, $scope, $timeout, $interval, $location, state, firebase) {
  'ngInject';

  const ctrl = this;

  this.started = false;
  this.currentWord = null;
  this.keys = [];
  this.entered = '';
  this.remaining = 40;
  this.penalty = 0;
  this.score = 0;
  this.wordIdx = 0;
  this.started = false;
  this.hint = [];

  /** Replaces the word to guess */
  this.nextWord = () => {
    ctrl.currentWord = this.words[this.wordIdx]; this.wordIdx += 1;
    ctrl.keys = toKeys(shuffle(ctrl.currentWord));
    ctrl.entered = '';
    ctrl.enteredKeys = [];
    ctrl.hint = [];
  };

  /**
  * Creates Game State object
  * @returns {Game.State} current state of game
  */
  const getGameState = () => fp.pick(['keys', 'entered', 'penalty'])(ctrl);

  /**
   * Action listener. Handy for the keyUp event
   * @param {KeyboardEvent}
   * @listens KeyboardEvent
   */
  this.changed = (e) => {
    const letter = e.key.toLowerCase();
    const gameState = updateKeys(getGameState(), letter);
    ctrl.entered = gameState.entered;
    ctrl.keys = gameState.keys;
    ctrl.enteredKeys = toKeys(gameState.entered);
    ctrl.penalty = gameState.penalty;
    $scope.$apply();

    if (ctrl.currentWord.length === ctrl.entered.length) {
      if (ctrl.currentWord === ctrl.entered) {
        ctrl.score += Math.floor(1.95 ** (ctrl.currentWord.length / 3));
      }
      $timeout(() => {
        ctrl.nextWord();
        $scope.$apply();
      }, 1000);
    }

    e.preventDefault();
  };

  /** Start a game */
  this.start = () => {
    if (!state.username || state.username.length === 0) {
      $location.url('/');
      $scope.$apply();
      return;
    }
    ctrl.started = true;
    ctrl.nextWord();
    $document.bind('keypress', ctrl.changed);
    ctrl.timer = $interval(ctrl.countDownOne, 1000);
    $scope.$apply();
  };

  /** End a game */
  this.end = () => {
    ctrl.started = false;
    $document.unbind('keypress', ctrl.changed);
    $interval.cancel(ctrl.timer);

    // Promised update
    firebase.database.ref(`/highscores/${state.username}`)
      .once('value').then((snapshot) => {
        const newScore = Math.max(0, ctrl.score - ctrl.penalty);
        if (!fp.isNumber(snapshot.val()) || snapshot.val() < newScore) {
          firebase.database.ref(`/highscores/${state.username}`).set(newScore);
        }
      });

    $timeout(() => {
      $location.url('/highscores');
    }, 1000);
  };


  /** Counts down one from the remaining time */
  this.countDownOne = () => {
    ctrl.remaining -= 1;
    if (ctrl.remaining === 0) {
      ctrl.end();
    }
    if (ctrl.hint.length < ctrl.currentWord.length) {
      ctrl.hint = ctrl.hint.concat([{
        id: ctrl.hint.length,
        ch: ctrl.currentWord[ctrl.hint.length],
      }]);
    }
  };

  // Load words
  // FIXME: promisify
  const wordsRef = firebase.database.ref('/words');
  wordsRef.child('MAX').once('value').then((snapshot) => {
    const max = snapshot.val();
    const randomIds = fp.times(() => fp.random(0)(max))(40);
    ctrl.words = [];

    randomIds.forEach((key) => {
      wordsRef.child(key).once('value').then((childSnapshot) => {
        ctrl.words = ctrl.words.concat([childSnapshot.val()]);
        if (!ctrl.started) {
          ctrl.start();
        }
      });
    });
  });
}

/**
 * @class
 * @classdesc This component represents the Game page of the application.
 * On this component, the words are displayed for 40 seconds, the pressed keys
 * are registered as guesses for the next letter. One can end the game with the
 * **End** button to traverse to the Highschores page
 * @see module:Game
 */
const GameComponent = {
  templateUrl: 'components/GameComponent.html',
  controller: GameController,
};

export default GameComponent;
