import angular from 'angular';
import 'angular-animate';
import 'angular-route';

import firebase from 'firebase';
import firebaseConfig from '../config/firebase.json';

import WelcomeComponent from './components/WelcomeComponent';
import GameComponent from './components/GameComponent';
import HighscoresComponent from './components/HighscoresComponent';

const App = angular.module('App', ['ngRoute', 'ngAnimate']);

App.controller('AppController', ($scope) => {
  $scope.$on('StartGame', (e, username) => {
    console.log('StartGame catched with username', username);
  });
});

App.component('welcomeComponent', WelcomeComponent);
App.component('gameComponent', GameComponent);
App.component('highscoresComponent', HighscoresComponent);

App.config(($routeProvider) => {
  $routeProvider.when('/', {
    template: '<welcome-component></welcome-component>',
  });
  $routeProvider.when('/game', {
    template: '<game-component></game-component>',
  });
  $routeProvider.when('/highscores', {
    template: '<highscores-component></highscores-component>',
  });
});

App.service('state', () => {});
App.service('firebase', function init() {
  this.firebaseApp = firebase.initializeApp(firebaseConfig);
  this.database = this.firebaseApp.database();
});

export default App;
