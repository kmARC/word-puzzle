import { shuffle, toKeys, updateKeys } from '../Game';

const WORDS = [
  'pizza',
  'slice',
  'tomato',
];

/**
 * @class
 * @classdesc Controller for the Game component.
 * All members are bound to the `$ctrl` object on `<game-component>`
 */
function GameController($document, $scope, $timeout, $interval, $location, state, firebase) {
  'ngInject';

  const ctrl = this;

  this.started = false;
  this.currentWord = null;
  this.keys = [];
  this.entered = '';
  this.remaining = 40;

  /** Replaces the word to guess */
  this.nextWord = () => {
    ctrl.currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    ctrl.keys = toKeys(shuffle(ctrl.currentWord));
    ctrl.entered = '';
  };

  /**
   * Action listener. Handy for the keyUp event
   * @param {KeyboardEvent}
   * @listens KeyboardEvent
   */
  this.changed = (e) => {
    const letter = e.key.toLowerCase();
    const [keys, entered] = updateKeys(ctrl.keys, ctrl.entered, letter);
    ctrl.entered = entered;
    ctrl.keys = keys;
    ctrl.enteredKeys = toKeys(entered);

    if (ctrl.currentWord.length === ctrl.entered.length) {
      if (ctrl.currentWord === ctrl.entered) {
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
    ctrl.started = true;
    ctrl.nextWord();
    $document.bind('keypress', ctrl.changed);
    ctrl.timer = $interval(ctrl.countDownOne, 1000);
  };

  /** End a game */
  this.end = () => {
    ctrl.started = false;
    ctrl.keys = [];
    ctrl.entered = '';
    $document.unbind('keypress', ctrl.changed);
    $timeout(() => {
      $location.url('/highscores');
    }, 1000);
    $interval.cancel(ctrl.timer);
  };


  /** Counts down one from the remaining time */
  this.countDownOne = () => {
    ctrl.remaining -= 1;
    if (ctrl.remaining === 0) {
      ctrl.end();
    }
  };

  this.start();
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
