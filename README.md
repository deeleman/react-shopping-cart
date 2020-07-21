# Frrontend Shopping Cart

Interactive, customisable shopping cart with discounts computation functionality and real-time total order price tracking.

## Setting up your environment
The minimum requirements for running this project, either on development or production mode, and its development scripts are `node v12.16.0` and `npm v.6.14.15`, or later versions. Probably this project will run smoothly on older versions of `node` and `npm` but we recommend using the latest [LTS versions](https://nodejs.org/).

This project relies on [Parcel](https://parceljs.org/) for spawning dev environments, running builds and handling code optimisations. All interaction with Parcel has been abstracted in custom npm commands for your convenience.

### Installing dependencies
As a first step to spawn a development environment or production build, please run either `yarn` or `npm install` to pull all the required dependencies for this project.

## Firing up a development environment
You can spawn a development environment by running `yarn start` or `npm run start` in the console.

The system will generate all the artifacts and assets and the compiled site will be available at http://localhost:9000 in _watch mode_, so the application will be recompiled upon changes on the source code.

## Building the project for production
Please execute `yarn build` or `npm run build` in your terminal window. 

Parcel will navigate through the entire application tree and build the site into the `/dist` folder. All files will be conveniently hashed to prevent caching issues.

## Code linting and testing
The code in this application is audited with 
[ESLint](https://eslint.org/) to ensure code quality, and unit tests built with [Jest](https://jestjs.io/). The following commands have been made available for your convenience:

- `yarn lint`: lints all TypeScript files, reporting code quality issues if any.
- `yarn test`: runs all the application unit tests.

### Code coverage reports
[Jest](https://jestjs.io/) has been configured to generate a full code coverage report in HTML every time the `test` command is executed. This coverage report can be found at `/coverage/lcov-report` when running tests in your local environment.

## Distributed under the MIT License

Copyright 2020 Pablo Deeleman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.