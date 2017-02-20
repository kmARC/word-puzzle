# Word Puzzle!

Word Puzzle game with Angular &amp; Firebase. It's a proof of concept
application to show development workflow for modern JS front end development.

## Try it out

For a hosted version **[click here](https://kmarc.github.io/word-puzzle/)**.

## Installation

1. Currently you need a Unix-like environment to build and deploy out of the box.

2. Install node.js and npm. Using the [node version manager (nvm)][nvm] is an easy
    choice.

    ``` bash
        # Install nvm
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
        # Re-login or start new bash session
        bash
        # Install stable node and latest npm
        nvm install --lts
        nvm use stable
        # Upgrade to latest npm
        npm install npm -g
    ```

3. Clone the word-puzzle repository and install locally

    ``` bash
        # Clone locally
        git clone https://github.com/kmARC/word-puzzle.git
        cd word-puzzle
        # Using nvm-managed node to start compilation and local hosting
        . env.sh
        npm install
        npm start
    ```

4. Navigate to http://localhost:8080/dist/index.html

## Development

Have a look at [package.json][package_json]. The following software are used
for development

### Tooling & compilation

> devDependencies and scripts sections

* mocha & chai for testing / BDD `npm run test` | `npm run test-watch`
* nyc /Istambul/ for code coverage `npm run coverage` (creates `coverage` dir)
* jsdoc for code documentation `npm run jsdoc` (creates `jsdoc` dir)
* eslint for code linting `npm run eslint`
* gh-pages for poor man's deployment `npm run deploy`
* babel for ES2016 -> old school javascript compilation
* webpack for module and asset bundling for the browser `npm run build`

### Libraries

> dependencies section

* angular is the main webapp framework
* bootstrap for widget styling
* firebase for data persistence
* lodash for pure functional style programming

## License

MIT

[nvm]: https://github.com/creationix/nvm
[package_json]: https://github.com/kmARC/word-puzzle/blob/master/package.json
