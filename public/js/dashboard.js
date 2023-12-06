// DISPLAY CURRENT DATE ON DASHBOARD LOAD
document.addEventListener('DOMContentLoaded', function () {
  const currentDateElement = document.getElementById('currentDate');
  const currentDate = new Date();
  currentDateElement.textContent = currentDate.toDateString();
});

//EVENT LISTENER FOR THE INCOME FILTER FORM
document
  .querySelector('#income-filter-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    updateIncomeTable();
  });

// FUNCTION TO UPDATE THE INCOME TABLE
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

document
  .querySelector('#add-income-button')
  .addEventListener('click', function () {
    // Open a form to input the new income data
  });

// FUNCTION TO POPULATE THE CLIENT AND INCOME TYPE DROPDOWNS using the API we created
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
