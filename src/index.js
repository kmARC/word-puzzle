import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';

import './index.less';

const app = angular.module('myApp', []);
app.controller('myCtrl', ($scope) => {
  $scope.firstName = 'John';
  $scope.lastName = 'Doe';
});

