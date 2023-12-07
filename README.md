# Xinc

> e  
> `Xinc`ome  
> p  
> e  
> n  
> s  
> e

## Description

Xinc is a simple, free expense and income transaction-tracker designed for small businesses and sole-traders to stay on top of their cashflow. Some key features include:

- Allowing users to enter and save income/expense transactions to their account.
- To filter/sort through these, for example, by payment status to see which have been payed and which haven't (alongside their due date, for example).
- Modals will alert a user if they have overdue transactions to review (i.e. payment hasn't been recieved/made and the transaction/invoice is passed it's due-by date).
- Dynamic charts that respond to user filter/sorting of transactions.
- A number of exciting features are also [in development!](#roadmap--known-bugs)

Xinc was built as a team-effort consisting of a number of open-source technologies in-line with the MVC paradigm.

- These include the [`Node.js`](https://nodejs.org/en) runtime environment, [`MySQL2`](https://www.npmjs.com/package/mysql2/) and [`Sequelize`](https://www.npmjs.com/package/sequelize/) for connecting and communicating with the `MySQL` database (db), [`Express`](https://www.npmjs.com/package/express/) for the web framework/server-functionality and [`Handlebars`](https://www.npmjs.com/package/handlebars/)
- It includes additional dependencies for handling sessions and hashing passwords, as well as some dev-dependencies for linting, code formatting and monitoring/watching servers; for a full list, see [`package.json`](./package.json) in the repo.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Roadmap / Known Bugs](#roadmap--known-bugs)
- [License](#license)
- [Questions](#questions)

## Installation

No installation is necessary, simple head to the deployed web-app [here](ADD/HEROKU/LINK)

## Usage

To use Xinc as your new income and expense tracker:

1. Step 1
2. Step 2

## Tests

No tests have been written for this application at this time.

## Roadmap / Known Bugs

The following is a non-exhaustive list of items we would like to address with more development time in the future:

### Features

- **Sorting/Filtering**

  - We had to remove option to filter by client/vendor name and expense/income type. This is due to the filtering currently being handled on the server-side and only accepting IDs rather than names. In the future, we will implement this feature by handling sorting/filtering on the client-side.
  - Default sorting should be by `issue_date` and not `invoice_id`.
  - The server-side capabilities exist to be able to sort by date range, but this has not yet been incorporated on the client-side.

- **2FA**

  - About 2FA here...

- **Scanning/uploading documents**

  - About scanning/uploading docs here.

- **Editing/Deleting Data**
  - Currently all the APIs exist to handle editing/deleting data (such as incomes/expenses, clients/vendors and types) on the server-side. With more time, we should be able to implement this functionality on the front-end (client-side) quite easily.

### UI

- **Income/Expense Tables**
  - I forgot...

### Code

- A large part of the build process saw functionalities be copied between income and expense. For this reason, the code would benefit from a refactoring of these common functionalities to improve maintainability and reduce redundancy.
- Additionally, while all the UI components on the Dashboard are handled/implemented as seperate partials, the logic is predominantly handles by a single JS file; maintainability would also be largely improved by the seperation and modularisation of that script.

## License

{License info}

- This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit).
- Please refer to the [license](./LICENSE) section in the repo for further information.

## Questions

{Where to address questions}
