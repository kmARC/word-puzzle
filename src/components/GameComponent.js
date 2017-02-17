/**
 * Angular module for Game
 * @module components/GameComponent
 * @see module:Game
 */

import angular from 'angular';

import { shuffle, toKeys, useKey } from '../Game';

const app = angular.module('GameComponent', []);

app.controller('GameController', ($scope) => {
  $scope.firstName = 'John';
  $scope.lastName = 'Doe';
  $scope.keys = toKeys(shuffle('pizza'));
  $scope.changed = (e) => {
    console.log(e.key, $scope.entered);
    if (e.key.match(/^[a-zA-Z]$/)) {
      $scope.keys = useKey($scope.keys, e.key);
    } else if (e.key.toLowerCase() === 'backspace') {
      console.log($scope.entered);
      const l = $scope.entered.length;
      const ch = $scope.entered.charAt(l - 1);
      $scope.keys = useKey($scope.keys, ch, false);
    }
  };
});

export default app;
