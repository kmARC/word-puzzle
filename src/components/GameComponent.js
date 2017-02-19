/**
 * Game Angular component
 * @module components/GameComponent
 * @see module:Game
 */

import { shuffle, toKeys, updateKeys } from '../Game';

const WORDS = [
  'pizza',
  'slice',
  'tomato',
];

function GameController($document, $scope, $timeout, $interval, $location) {
  'ngInject';

  const ctrl = this;

  /* State */
  ctrl.started = false;
  ctrl.currentWord = null;
  ctrl.keys = [];
  ctrl.entered = '';
  ctrl.remaining = 40;

  ctrl.nextWord = () => {
    ctrl.currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    ctrl.keys = toKeys(shuffle(ctrl.currentWord));
    ctrl.entered = '';
  };

  ctrl.changed = (e) => {
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
  };

  $interval(() => {
    ctrl.remaining -= 1;
    if (ctrl.remaining === 0) {
      ctrl.end();
    }
  }, 1000);

  const keyPressHandler = (e) => {
    ctrl.changed(e);
    e.preventDefault();
    $scope.$apply();
  };

  ctrl.start = () => {
    ctrl.started = true;
    ctrl.nextWord();
    $document.bind('keypress', keyPressHandler);
  };

  ctrl.end = () => {
    ctrl.started = false;
    ctrl.keys = [];
    ctrl.entered = '';
    $document.unbind('keypress', keyPressHandler);
    $timeout(() => {
      $location.url('/highscores');
    }, 1000);
  };

  ctrl.start();
}

const GameComponent = {
  templateUrl: 'components/GameComponent.html',
  controller: GameController,
};

export default GameComponent;
