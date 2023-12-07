// TODO in future: refactor by seperating functions for income and expenses into seperate files
//GLOBAL VARIABLES - for chart on page load and update on table filtering
let totalIncome = 0;
let totalExpense = 0;
let chart;

//______________________EVENT LISTENER FOR DOM LOAD - DATE AND INCOME/EXPENSE DROPDOWNS_____________________
document.addEventListener('DOMContentLoaded', async function () {
  // DISPLAY CURRENT DATE ON DASHBOARD LOAD
  const currentDateElement = document.getElementById('currentDate');
  const currentDate = new Date();
  currentDateElement.textContent = currentDate.toDateString();

  try {
    // ON LOAD POPULATE THE CLIENT AND INCOME TYPE DROPDOWNS using the API we created
    // Select the dropdowns
    const clientSelect = document.getElementById('incomeClientSelect');
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

    // ON LOAD POPULATE THE VENDOR AND EXPENSE TYPE DROPDOWNS using the API we created
    // Select the dropdowns
    const vendorSelect = document.getElementById('expenseVendorSelect');
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

    //API CALLS TO UPDATE THE TOTAL INCOME AND TOTAL EXPENSE for use in updateChart()
    // Fetch the total income and total expense from the API
    const totalIncomeResponse = await fetch('/api/income/total');
    const totalExpenseResponse = await fetch('/api/expense/total');

    // Assign the total income and total expense to the global variables
    // Don't need to be parsed as the apis are returning a single number
    totalIncome = await totalIncomeResponse.json();
    totalExpense = await totalExpenseResponse.json();
  } catch (err) {
    console.error('Error:', err);
  }

  // INITIALISE THE CHART ON PAGE LOAD - EDIT CHART FORMAT HERE
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: 'Total Amount',
          data: [totalIncome, totalExpense],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  //______________________MODALS____________________

  // Get modals
  var incomeModal = document.querySelector('#incomeModal');
  var expenseModal = document.querySelector('#expenseModal');
  // Get modals
  // Check if the modals exist before attempting to access them
  if (incomeModal) {
    // Get close button for the income modal
    var closeIncomeModalButton = document.querySelector('#closeIncomeModal');

    // Check if the income modal has been closed in this session
    if (sessionStorage.getItem('incomeModalClosed')) {
      incomeModal.style.display = 'none';
    }

    // On click, close the income modal and store in sessionStorage
    // in logout.js, the sessionStorage item is removed
    closeIncomeModalButton.addEventListener('click', function () {
      incomeModal.style.display = 'none';
      sessionStorage.setItem('incomeModalClosed', 'true');
    });
  }

  if (expenseModal) {
    // Get close button for the expense modal
    var closeExpenseModalButton = document.querySelector('#closeExpenseModal');

    // Check if the expense modal has been closed in this session
    if (sessionStorage.getItem('expenseModalClosed')) {
      expenseModal.style.display = 'none';
    }

    // On click, close the expense modal and store in sessionStorage
    // in logout.js, the sessionStorage item is removed
    closeExpenseModalButton.addEventListener('click', function () {
      expenseModal.style.display = 'none';
      sessionStorage.setItem('expenseModalClosed', 'true');
    });
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
  const invoiceIdInput = document.getElementById('incomeInvoiceIdInput');
  const clientSelect = document.getElementById('incomeClientSelect');
  const incomeTypeSelect = document.getElementById('incomeTypeSelect');
  const paymentStatusSelect = document.getElementById(
    'incomePaymentStatusSelect'
  );
  const sortSelect = document.getElementById('incomeSortSelect');
  const orderSelect = document.getElementById('incomeOrderSelect');

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

  // Fetch the filtered data from the API
  const response = await fetch(`/api/income?${paramString}`, {
    method: 'GET',
    // Add any necessary headers and query parameters here
  });

  const data = await response.json();

  // Get the table body
  const tbody = document.querySelector('#incomeTable tbody');

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
  totalIncome = 0;

  // Loop through the income data and add up all the amounts
  data.incomeData.forEach((income) => {
    totalIncome += parseFloat(income.amount);
  });
  // Render the sumAmount to the table footer as a number with 2 decimal places
  document.querySelector('#incomeSumAmount').textContent =
    totalIncome.toFixed(2);

  // update the chart with a new income total
  updateChart();
}

//______________________FUNCTION TO UPDATE THE EXPENSE TABLE USING FILTERS_____________________
async function updateExpenseTable() {
  // Get the form elements
  const invoiceIdInput = document.getElementById('expenseInvoiceId');
  const vendorSelect = document.getElementById('expenseVendorSelect');
  const expenseTypeSelect = document.getElementById('expenseTypeSelect');
  const paymentStatusSelect = document.getElementById(
    'expensePaymentStatusSelect'
  );
  const sortSelect = document.getElementById('expenseSortSelect');
  const orderSelect = document.getElementById('expenseOrderSelect');

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

  // Fetch the filtered data from the API
  const response = await fetch(`/api/expense?${paramString}`, {
    method: 'GET',
  });

  const data = await response.json();

  // Get the table body
  const tbody = document.querySelector('#expenseTable tbody');

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
  totalExpense = 0;

  // Loop through the expense data and add up all the amounts
  data.expenseData.forEach((expense) => {
    totalExpense += parseFloat(expense.amount);
  });

  // Render the sumAmount to the table footer
  document.querySelector('#expenseSumAmount').textContent =
    totalExpense.toFixed(2);

  // update the chart with a new expense total
  updateChart();
}

//______________________CHARTS____________________
// TODO - expound on this and add more chartts/functionality - move to new JS file
// Currently chart get's updated automatically when DOM loads, and whever a table is updated via filtering/sorting

function updateChart() {
  // Update the chart dataset with the values that are updated when tables are updated
  chart.data.datasets[0].data = [totalIncome, totalExpense];

  // Update the chart
  chart.update();
}
