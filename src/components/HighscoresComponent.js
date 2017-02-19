/**
 * Highscores Angular component
 * @module components/HighscoresComonent
 * @see module:Highscores
 */

import fp from 'lodash/fp';

function HighscoresController($scope, firebase) {
  'ngInject';

  const ctrl = this;
  ctrl.highscores = [];

  firebase.database.ref('/highscores').on('value', (snapshot) => {
    const vals = snapshot.val();
    const mapper = key => ({ username: key, score: vals[key] });
    const highscores = fp.keys(vals).map(mapper);

    ctrl.highscores = highscores;

    $scope.$apply();
  });
}

const HighscoresComponent = {
  templateUrl: 'components/HighscoresComponent.html',
  controller: HighscoresController,
};

export default HighscoresComponent;
