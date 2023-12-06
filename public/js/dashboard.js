// TODO in future: refactor by seperating functions for income and expenses into seperate files
// TODO in future: add functionality to filter by date range
// TODO in future: add functionality to filter by client and income type

// DISPLAY CURRENT DATE ON DASHBOARD LOAD
document.addEventListener('DOMContentLoaded', function () {
  const currentDateElement = document.getElementById('currentDate');
  const currentDate = new Date();
  currentDateElement.textContent = currentDate.toDateString();
});

//______________________ON LOAD POPULATE THE CLIENT AND INCOME TYPE DROPDOWNS using the API we created_____________________
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Select the dropdowns
    const clientSelect = document.getElementById('clientSelect');
    const incomeTypeSelect = document.getElementById('incomeTypeSelect');

    // Make API requests to get the clients and income types
    const clientsResponse = await fetch('/api/income/client');
    const incomeTypesResponse = await fetch('/api/income/type');

    // Parse responses
    const clients = await clientsResponse.json();
    const incomeTypes = await incomeTypesResponse.json();

    // Loop thru' clients and add them to the client dropdown
    clients.forEach((client) => {
      const option = document.createElement('option');
      option.value = client.id;
      option.text = client.client_name;
      clientSelect.add(option);
    });

    // Loop through the income types and add them to the income type dropdown
    incomeTypes.forEach((incomeType) => {
      const option = document.createElement('option');
      option.value = incomeType.id;
      option.text = incomeType.income_name;
      incomeTypeSelect.add(option);
    });
  } catch (error) {
    console.error('Error:', error);
  }
});

//______________________ON LOAD POPULATE THE VENDOR AND EXPENSE TYPE DROPDOWNS using the API we created_____________________
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Select the dropdowns
    const vendorSelect = document.getElementById('vendorSelect');
    const expenseTypeSelect = document.getElementById('expenseTypeSelect');

    // Make API requests to get the vendors and expense types
    const vendorsResponse = await fetch('/api/expense/vendor');
    const expenseTypesResponse = await fetch('/api/expense/type');

    // Parse responses
    const vendors = await vendorsResponse.json();
    const expenseTypes = await expenseTypesResponse.json();

    // Loop thru' vendors and add them to the vendor dropdown
    vendors.forEach((vendor) => {
      const option = document.createElement('option');
      option.value = vendor.id;
      option.text = vendor.vendor_name;
      vendorSelect.add(option);
    });

    // Loop through the expense types and add them to the expense type dropdown
    expenseTypes.forEach((expenseType) => {
      const option = document.createElement('option');
      option.value = expenseType.id;
      option.text = expenseType.expense_name;
      expenseTypeSelect.add(option);
    });
  } catch (error) {
    console.error('Error:', error);
  }
});

//______________________EVENT LISTENER FOR THE INCOME/EXPENSE FILTER FORMs_____________________
//EVENT LISTENER FOR THE INCOME FILTER FORM
document
  .querySelector('#income-filter-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    updateIncomeTable();
  });

// EVENT LISTENER FOR THE EXPENSE FILTER FORM
document
  .querySelector('#expense-filter-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    updateExpenseTable();
  });

// ________________FUNCTION TO UPDATE THE INCOME TABLE USING FILTERS_____________________
async function updateIncomeTable() {
  // Get the form elements
  const invoiceIdInput = document.getElementById('invoiceIdInput'); // Might simplify by removing this
  const clientSelect = document.getElementById('clientSelect');
  const incomeTypeSelect = document.getElementById('incomeTypeSelect');
  const paymentStatusSelect = document.getElementById('paymentStatusSelect');
  const sortSelect = document.getElementById('sortSelect');
  const orderSelect = document.getElementById('orderSelect');

  // Create an object with the parameters for the API request (all are optional except sort - some can be empty though
  const params = {
    invoice_id: invoiceIdInput.value, // Might simplify by removing this
    client: clientSelect.value, // values are dynamically generated blow as client.id
    income_type: incomeTypeSelect.value, // values are dynamically generated blow as client.id
    payment_status: paymentStatusSelect.value, // values are 1 or 0 to match DB.
    sort: sortSelect.value, //values for sorting - currently incometype and client unsupported/removed
    order: orderSelect.value, // values are asc or desc
  };

  // Handle the empty parameters by looping through all and removing those that are ''
  // Use Object.keys()
  // https://stackoverflow.com/questions/48962239/how-do-i-loop-through-object-and-remove-properties-which-are-not-equal-to-someth
  Object.keys(params).forEach((key) => {
    if (params[key] === '') {
      delete params[key];
    }
  });

  // Construct the URL with the parameters
  const paramString = new URLSearchParams(params).toString();
  console.log(paramString);

  // Fetch the filtered data from the API
  const response = await fetch(`/api/income?${paramString}`, {
    method: 'GET',
    // Add any necessary headers and query parameters here
  });

  const data = await response.json();
  console.log(data);

  // Get the table body
  const tbody = document.querySelector('table tbody');

  // Clear the existing table data
  tbody.innerHTML = '';

  data.incomeData.forEach((income) => {
    const row = document.createElement('tr');

    // Create a new cell for each property of the item
    // Adjusted to handle nested properties
    const cellInvoiceId = document.createElement('td');
    cellInvoiceId.textContent = income.invoice_id;
    row.appendChild(cellInvoiceId);

    const cellIssueDate = document.createElement('td');
    cellIssueDate.textContent = income.issue_date;
    row.appendChild(cellIssueDate);

    const cellClient = document.createElement('td');
    cellClient.textContent = income.client.client_name;
    row.appendChild(cellClient);

    const cellIncomeType = document.createElement('td');
    cellIncomeType.textContent = income.income_type.income_name;
    row.appendChild(cellIncomeType);

    const cellDescription = document.createElement('td');
    cellDescription.textContent = income.description;
    row.appendChild(cellDescription);

    const cellAmount = document.createElement('td');
    cellAmount.textContent = income.amount;
    row.appendChild(cellAmount);

    const cellDueDate = document.createElement('td');
    cellDueDate.textContent = income.due_date;
    row.appendChild(cellDueDate);

    const cellPaymentStatus = document.createElement('td');
    cellPaymentStatus.textContent = income.payment_status;
    row.appendChild(cellPaymentStatus);

    tbody.appendChild(row);
  });
  // Reset the total income to 0
  let sumAmount = 0;

  // Loop through the income data and add up all the amounts
  data.incomeData.forEach((income) => {
    sumAmount += parseFloat(income.amount);
  });
  // Render the sumAmount to the table footer as a number with 2 decimal places
  document.querySelector('#sumAmount').textContent = sumAmount.toFixed(2);
}

//______________________FUNCTION TO UPDATE THE EXPENSE TABLE USING FILTERS_____________________
async function updateExpenseTable() {
  // Get the form elements
  const invoiceIdInput = document.getElementById('invoiceIdInput');
  const vendorSelect = document.getElementById('vendorSelect');
  const expenseTypeSelect = document.getElementById('expenseTypeSelect');
  const paymentStatusSelect = document.getElementById('paymentStatusSelect');
  const sortSelect = document.getElementById('sortSelect');
  const orderSelect = document.getElementById('orderSelect');

  // Create an object with the parameters for the API request
  const params = {
    invoice_id: invoiceIdInput.value,
    vendor: vendorSelect.value,
    expense_type: expenseTypeSelect.value,
    payment_status: paymentStatusSelect.value,
    sort: sortSelect.value,
    order: orderSelect.value,
  };

  // Handle the empty parameters
  Object.keys(params).forEach((key) => {
    if (params[key] === '') {
      delete params[key];
    }
  });

  // Construct the URL with the parameters
  const paramString = new URLSearchParams(params).toString();
  console.log(paramString);

  // Fetch the filtered data from the API
  const response = await fetch(`/api/expense?${paramString}`, {
    method: 'GET',
  });

  const data = await response.json();
  console.log(data);

  // Get the table body
  const tbody = document.querySelector('table tbody');

  // Clear the existing table data
  tbody.innerHTML = '';

  data.expenseData.forEach((expense) => {
    const row = document.createElement('tr');

    // Create a new cell for each property of the item
    const cellInvoiceId = document.createElement('td');
    cellInvoiceId.textContent = expense.invoice_id;
    row.appendChild(cellInvoiceId);

    const cellIssueDate = document.createElement('td');
    cellIssueDate.textContent = expense.issue_date;
    row.appendChild(cellIssueDate);

    const cellVendor = document.createElement('td');
    cellVendor.textContent = expense.vendor.vendor_name;
    row.appendChild(cellVendor);

    const cellExpenseType = document.createElement('td');
    cellExpenseType.textContent = expense.expense_type.expense_name;
    row.appendChild(cellExpenseType);

    const cellDescription = document.createElement('td');
    cellDescription.textContent = expense.description;
    row.appendChild(cellDescription);

    const cellAmount = document.createElement('td');
    cellAmount.textContent = expense.amount;
    row.appendChild(cellAmount);

    const cellDueDate = document.createElement('td');
    cellDueDate.textContent = expense.due_date;
    row.appendChild(cellDueDate);

    const cellPaymentStatus = document.createElement('td');
    cellPaymentStatus.textContent = expense.payment_status;
    row.appendChild(cellPaymentStatus);

    tbody.appendChild(row);
  });

  // Reset the total expense to 0
  let sumAmount = 0;

  // Loop through the expense data and add up all the amounts
  data.expenseData.forEach((expense) => {
    sumAmount += parseFloat(expense.amount);
  });

  // Render the sumAmount to the table footer
  document.querySelector('#sumAmount').textContent = sumAmount.toFixed(2);
}

// TODO - add following functionality
//______________________EVENT LISTENER FOR THE ADD EXPENSE/INCOME BUTTONS____________________
document
  .querySelector('#add-expense-button')
  .addEventListener('click', function () {
    // Open a form to input the new expense data
  });

document
  .querySelector('#add-income-button')
  .addEventListener('click', function () {
    // Open a form to input the new income data
  });
