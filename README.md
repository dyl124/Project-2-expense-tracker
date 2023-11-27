- This boilerplate confomrs to the MVC paradigm and is intended for a full-stack web-app that uses the [`Node.js`](https://nodejs.org/en) runtime environment, leveraging [`MySQL2 v^3.6.3`](https://www.npmjs.com/package/mysql2/v/3.6.3) and [`Sequelize v^6.35.1`](https://www.npmjs.com/package/sequelize/v/6.35.1) for connecting and communicating with the `MySQL` database (db) and using [Express v4.18.2](https://www.npmjs.com/package/express/v/4.18.2) for the web framework/server-functionality.
- It includes additional dependencies for handling sessions and hashing passwords, as well as some dev-dependencies for linting, code formatting and monitoring/watching servers; for a full list, see [`package.json`](./package.json) in the repo.

## README boilerplate:

# PROJECT NAME

{Project Description}.

## Description

- This application allows you to dynamically generate a simple Scalable Vector Graphics (SVG) logo by answering just a handful of prompts in your console!
  - The prompts let you specify the shape and colour for your logo, as well as the text-content, font-style and colour.
- It is written in JS using the [Node.js](https://nodejs.org/en) runtime environment, leveraging [Inquirer v8.2.4](https://www.npmjs.com/package/inquirer/v/8.2.4) for terminal/command-line interactivity and [Jest v29.7.0](https://www.npmjs.com/package/jest/v/29.7.0) for testing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Usage Guide](#usage-guide)
  - [Walkthrough Video](#walkthrough-video)
- [Tests](#tests)
- [Roadmap / Known Bugs](#roadmap--known-bugs)
  - [Features](#features)
  - [Tests](#tests-1)
- [License](#license)
- [Questions](#questions)

## Installation

Before installing the application, please ensure you have installed [`Node.js`](https://nodejs.org/en) and `npm`.

To install the application:

1. Visit the [SVG-logo-generator](https://github.com/trnigg/SVG-logo-generator) repo on GitHub.
2. Download and extract the `.zip` of the repository to your desired directory:  
   ![Screenshot showing that clicking the CODE dropdown shows a link to download ZIP](./assets/screenshots/screenshot_download.png)
3. Navigate to the directory using the console, or open it in an integrated terminal.
4. Enter `npm i` or `npm install` in your console or integrated terminal to retrieve and install the required dependencies and create a folder to store these (`./node_modules`), as depicted below:  
   ![Screenshot depicting the initialisation process](./assets/screenshots/screenshot_npm-i.png)

## Usage

### Usage Guide

To use the application:

1. While in the directory it is stored in (see [Installation](#installation) above), enter `node index.js` in the console to run the application.
2. You will be given some brief instructions that require confirmation. Enter `y` to confirm you understand and wish to continue.
3. You will then be asked a number of questions in the terminal; answer these as directed to generate your personalised logo.
   - Please take note of the questions regarding colour-choices. Colours can be specified as either:
     - **Colour keyword names**. See the guide below for a list of recognised colour keywords:  
       (If using night/dark-mode, you may need to click on the guide for it to be legible)  
       ![SVG image from wikimedia listing recognised colour keywords](https://upload.wikimedia.org/wikipedia/commons/2/2b/SVG_Recognized_color_keyword_names.svg) - These may be entered in natural language, using spaces - the app will normalise your input (e.g. 'light sky blue' will become `lightskyblue`);
     - **Hex colour codes**. These must be 6-characters long and preceded with a `#`. Please see above for examples, and/or use a [colour-picker tool](https://htmlcolorcodes.com/) to help find a valid hex colour code.
   - Currently there is no validation of colour-responses (please see [Roadmap / Known Bugs](#roadmap--known-bugs)). Unrecognised or invalid colour entries will default to `black`.
4. If you make a mistake and wish to restart, currently the only way to do this is by pressing `ctrl + c` on Windows or `⌘ + c` on Mac. Unfortunately, you will need to begin at **Step 1** again and none of your answers will have been saved.
5. The last question is regarding the **filename** for your project. Once you complete this, an `.svg` file titled with your response and containing your logo will be created in the directory you are in.
   - If nothing is entered, the default name (including extension) for your file will be `logo.svg`.
   - Any unsafe characters for use in a filename will be removed and the filename will be converted to kebab-case (e.g., entering 'My Logo' will return a file called `my-logo.svg`).

Note: you can repeat this process from **Step 1**, but if you choose a filename for your generated logo that already exist in your directory, it will be overwritten.

### Walkthrough Video

> - Please click [here](https://drive.google.com/file/d/1-M9e-Jswql1o5COA5ONXuNOwoJ-piFLE/view) to watch a video-walkthrough of **tests** and the **usage** process.
> - The repo also contains a couple of [sample logos](./assets/samples/) generated using this application, including the one shown in the walkthrough:  
>   ![sample logo generated in the walkthrough, showing the pink letters TRN in cursive, written over a dark-slate-grey circle](./assets/samples/sample-logo-circle-walkthrough.svg)

## Tests

- After it has been installed, to run the tests for the application enter `npm test` in your terminal:  
  ![Screenshot of an integrated terminal showing npm test command and all test passing](./assets/screenshots/screenshot_npm-test.png)
- Due to contraints in developement-time, only a crucial subsection of the code has had tests implemented. These tests achieve 100% coverage where implemented, and all pass:  
  ![Screenshot showing all-passing tests across the four Shapes classes and subclasses, with full coverage](./assets/screenshots/screenshot_tests.png)

## Roadmap / Known Bugs

The following is a non-exhaustive list of items I would like to address with more development time in the future:

### Features

- Feature allowing 'backwards navigation' through the prompts, in case the user makes a mistake and wishes to go back to change their answer.
- Feature to display the answers to the user in the console before generating the logo, followed by questions that would allow the user to go through and edit or change their answers.
- Implement more choices for logo generation, including sizes, borders, and more shapes.
- As mentioned in the [Usage Guide](#usage-guide) guide above, currently there is no validation on colours, which could lead to failures to render desired colour _without_ notifying the user.
  - One solution would be to implement a validator package such as [Validate Colour](https://www.npmjs.com/package/validate-color/v/2.2.1) to handle this. Thank-you to [rtrevill](https://github.com/rtrevill) for pointing me towards this!

### Tests

- As mentioned earlier, only a subsection of code has tests written for it. Although it is too late, to take a test-first approach to the code for the features already written, it would nonetheless be beneficial to implement further tests in the feature:
  - This will help ensure that any future modifications to the code (or implementation of any new features) does not break anything in the existing code.

## License

- This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit).
- Please refer to the [license](./LICENSE) section in the repo for further information.

## Questions

- For any questions, issues or feedback, please reach out to me on GitHub at [trnigg](https://github.com/trnigg/).
