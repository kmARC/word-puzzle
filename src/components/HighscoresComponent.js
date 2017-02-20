import fp from 'lodash/fp';

/**
 * @class
 * @classdesc Controller for the Highscores component.
 * All members are bound to the `$ctrl` object on `<highscores-component>`
 */
function HighscoresController($scope, $location, firebase) {
  'ngInject';

  const ctrl = this;

  this.highscores = [];

  /** Starts a new game by navigating to the Game component */
  this.newGame = () => {
    $location.url('/game');
  };

  firebase.database.ref('/highscores').on('value', (snapshot) => {
    const vals = snapshot.val();
    const mapper = key => ({ username: key, score: vals[key] });
    const highscores = fp.keys(vals).map(mapper);

    ctrl.highscores = highscores;

    $scope.$apply();
  });
}

/**
 * @class
 * @classdesc This component represents the Highscores page of the application.
 * The highscores table is filled with data gathered from the firebase data
 * store
 */
const HighscoresComponent = {
  templateUrl: 'components/HighscoresComponent.html',
  controller: HighscoresController,
};

export default HighscoresComponent;
