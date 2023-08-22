# Description

* This is an experimental React Native app created to showcase how microfrontends/modular architecture could be achieved in React Native
* There is no state manager because there was no need for one. If such a need were to occur, it would be quite easy to add
* MVVM design pattern is used to separate business logic from the view layer
* Each module is a standalone/independent unit/package that is ready to be assigned to a corresponding development team for further maintenance and development
* Each module can use its own state manager and API client for networking
* Classes were used because they were deemed as the most suitable structures for the task

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Environment

The project requires:
* Node >=18
* Ruby version >=2.6.10

## Initialisation

After cloning the project the node modules and pods need to be installed by running the following command:

```bash
yarn
```

# Development

The following command runs the app in an emulator:

```bash
yarn android

# OR for ios
yarn ios
```

## Linting

The following command lints the project:

```bash
yarn lint
```

## Tests

The following command runs tests for the project:

```bash
yarn test
```

To run e2e tests:
0. Maestro should be installed https://maestro.mobile.dev/getting-started/installing-maestro
1. The app should be built and installed on an emulator (the easiest approach would be to use `yarn ios` or `yarn android`)
2. Navigate to the e2e folder:
```bash
cd ./e2e
```
3. Run the following command:
```bash
maestro test android-flow.yaml

# OR for ios
maestro test ios-flow.yaml
```
