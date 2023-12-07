# Xinc

e  
**Xinc** o m e  
p  
e  
n  
s  
e

## Description

Xinc is a simple, free expense and income transaction-tracker designed for small businesses and sole-traders to stay on top of their cashflow. Some key features include:

- Allowing users to enter and save income/expense transactions to their account.
- To filter/sort through these, for example, by payment status to see which have been payed and which haven't (alongside their due date, for example).
- Modals will alert a user if they have overdue transactions to review (i.e. payment hasn't been recieved/made and the transaction/invoice is past it's due-by date).
- Dynamic charts that respond to user filter/sorting of transactions.
- A number of exciting features are also [in development!](#roadmap--directions-for-future-dev)

Xinc was built as an "agile" team-effort consisting of a number of open-source technologies in-line with the MVC paradigm.

- These include the [`Node.js`](https://nodejs.org/en) runtime environment, [`MySQL2`](https://www.npmjs.com/package/mysql2/) and [`Sequelize`](https://www.npmjs.com/package/sequelize/) for connecting and communicating with the `MySQL` database (db), [`Express`](https://www.npmjs.com/package/express/) for the web framework/server-functionality and [`Handlebars`](https://www.npmjs.com/package/handlebars/)
- It includes additional dependencies for handling sessions and hashing passwords, as well as some dev-dependencies for linting, code formatting and monitoring/watching servers; for a full list, see [`package.json`](./package.json) in the repo.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Roadmap / Future Dev Directions](#roadmap--directions-for-future-dev)
- [License](#license)
- [Questions](#questions)

## Installation

No installation is necessary, simply head to the deployed web-app [here](ADD/HEROKU/LINK)

## Usage

To use Xinc as your new income and expense tracker:

1. Register for an account by clicking on the sign up button on the homepage.
2. Once registered, you will need to log in with your new account details.
3. Once logged in, you will be taken to the dashboard:  
   3.1. If you have logged in previously and already have income and expense data tied to your account, you will be met with modals at the top of your dashboard alerting you to any overdue income/expense payments. You can snooze these until your next log-in by clicking the **X** button.  
   3.2. Use the filter element to sort and filter your transactions, to give you the oversight you want. This will also dynamically update the chart with new amounts.  
   3.3. Click Add Transaction to add a new expense or income transaction.
4. Once you have reviewed your transactions and/or added any new data, remember to end your session by logging out using the log out button!

## Tests

No tests have been written for this application at this time.

## Roadmap / Directions for Future Dev

The following is a non-exhaustive list of items we would like to address with more development time in the future:

### Features

- **Sorting/Filtering**

  - We had to remove option to filter by client/vendor name and expense/income type. This is due to the filtering currently being handled on the server-side and only accepting IDs rather than names. In the future, we will implement this feature by handling sorting/filtering on the client-side.
  - Default sorting should be by `issue_date` and not `invoice_id`.
  - The server-side capabilities exist to be able to sort by date range, but this has not yet been incorporated on the client-side.

- **Editing/Deleting Data**

  - Currently all the APIs exist to handle editing/deleting data (such as incomes/expenses, clients/vendors and types) on the server-side. With more time, we should be able to implement this functionality on the front-end (client-side) quite easily.

- **Invoice Creation and Distribution**

  - Another feature we would like to implement is a function that allows the user to create an invoice directly in-house (in _Xinc_) with integration to send the invoice as a PDF directly to the client, and simultaneously add it to the Income table where it can be tracked!

- **Better and more Charts**

  - The current chart in _Xinc_ dynamically updates according to the filter/sort options selected by the user. However, the current chart is more akin to proof of concept and only shows the total amounts for income and expense.
  - With more development time we will add a larger variety of options for the user to dynamically configure charts to show any analytical data they want.

- **2FA**

  - As Xinc will include the user's sensitive financial data, implementing 2 factor authentication would ensure a more secure experience.

- **Google API to scan text**

  - Enable a feature that includes image recognition to enable users to input their incomes and expenses by uploading documents, which can make Xinc more efficient.

- **PDF Generation**
  - Implement technology that generates the user's end of year financial report in the form of a PDF. This will users to be able to keep track of their expenses in a more organised manner, and allow easier transfer of data to 3rd parties such as a user's accountant.

### Code

- A large part of the build process saw functionalities be copied between income and expense. For this reason, the code would benefit from a refactoring of these common functionalities to improve maintainability and reduce redundancy.
- Additionally, while all the UI components on the Dashboard are handled/implemented as seperate partials, the logic is predominantly handles by a single JS file; maintainability would also be largely improved by the separation and modularisation of that script.

## License

- This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit).
- Please refer to the [license](./LICENSE) section in the repo for further information.
