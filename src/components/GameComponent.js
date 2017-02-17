/**
 * Angular module for Game
 * @module components/GameComponent
 * @see module:Game
 */

import angular from 'angular';

import { shuffle, toKeys, updateKeys } from '../Game';

const WORDS = [
  'pizza',
  'slice',
  'tomato',
];

function GameController($document, $scope) {
  const ctrl = this;

  ctrl.started = false;

  ctrl.keys = [];

  ctrl.currentWord = null;

  ctrl.nextWord = () => {
    ctrl.currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    ctrl.entered = '';
    ctrl.keys = toKeys(shuffle(ctrl.currentWord));
  };

  ctrl.entered = '';

  ctrl.changed = (e) => {
    const letter = e.key.toLowerCase();
    const [keys, entered] = updateKeys(ctrl.keys, ctrl.entered, letter);
    ctrl.entered = entered;
    ctrl.keys = keys;

    if (ctrl.currentWord.length === ctrl.entered.length) {
      if (ctrl.currentWord === ctrl.entered) {
        window.setTimeout(() => {
          console.log('ok');
          ctrl.nextWord();
          $scope.$apply();
        }, 1000);
      } else {
        console.log('WRONG');
        window.setTimeout(() => {
          ctrl.nextWord();
          $scope.$apply();
        }, 1000);
      }

    }
  };

  ctrl.start = () => {
    ctrl.started = true;
    ctrl.nextWord();
  };

  $document.bind('keypress', (e) => {
    ctrl.changed(e);
    e.preventDefault();
    $scope.$apply();
  });
}

const WordPuzzle = angular.module('WordPuzzle', []);

WordPuzzle.component('gameComponent', {
  templateUrl: 'components/GameComponent.html',
  controller: GameController,
});
