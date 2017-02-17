/**
 * Welcome Angular component
 * @module components/WelcomeComponent
 * @see module:Welcome
 */

function WelcomeController($location) {
  const ctrl = this;

  ctrl.start = () => {
    if (ctrl.username && ctrl.username.length) {
      $location.url('/game');
    }
  };
}

const WelcomeComponent = {
  templateUrl: 'components/WelcomeComponent.html',
  controller: WelcomeController,
};

export default WelcomeComponent;

