/**
 * @class
 * @classdesc Controller for the Welcome component.
 * All members are bound to the `$ctrl` object on `<welcome-component>`
 */
function WelcomeController($location, state) {
  'ngInject';

  const ctrl = this;

  /** @type {string} */
  this.username = '';

  /** Starts a game and redirects to the Game component */
  this.start = () => {
    if (ctrl.username && ctrl.username.length) {
      state.username = ctrl.username;
      $location.url('/game');
    }
  };
}

/**
 * @class
 * @classdesc This component represents the Welcome page of the application.
 * It provides the user with a form to enter user name and start a game.
 */
const WelcomeComponent = {
  templateUrl: 'components/WelcomeComponent.html',
  controller: WelcomeController,
};

export default WelcomeComponent;

