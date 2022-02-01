# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Launches the development server using `react-scripts start`

### `yarn start`

Launches the express server to serve the build files. If build files doesn't exist use `yarn build` to create them.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Creates build bundle.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

First, It creates the build files through `yarn build` then launches the node.js server through
`yarn start`. It will run in eb using `Procfile`.
