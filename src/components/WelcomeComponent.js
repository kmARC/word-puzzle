/**
 * Welcome Angular component
 * @module components/WelcomeComponent
 * @see module:Welcome
 */

function WelcomeController($location, state) {
  'ngInject';

  const ctrl = this;

  ctrl.start = () => {
    if (ctrl.username && ctrl.username.length) {
      state.username = ctrl.username;
      $location.url('/game');
    }
  };
}

const WelcomeComponent = {
  templateUrl: 'components/WelcomeComponent.html',
  controller: WelcomeController,
};

export default WelcomeComponent;

