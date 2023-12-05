
// change listens for any change in the form, eg when a user selects a new option from the dropdown
// maybe change code to a button that says "filter" and then it will fetch the data from the API once clicked
document
  .querySelector('#income-filter-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const params = {};
    // logic for filtering and creating the url below
    // Checkboxes (replace these with your actual checkbox elements)
    // Dropdowns (replace these with your actual dropdown elements)
    const invoiceIdDropdown = document.getElementById('invoiceId');
    const clientDropdown = document.getElementById('clientDropdown');
    const paymentStatusDropdown = document.getElementById('paymentStatus');

    // If invoice_id dropdown has a selected value, add it to the params
    if (invoiceIdDropdown.value) {
      params.invoice_id = invoiceIdDropdown.value;
    } else {
      console.log('Invoice ID parameter not selected.');
    }

    if (clientDropdown.value) {
      params.client = clientDropdown.value;
    } else {
      console.log('Client parameter not selected.');
    }

    if (paymentStatusDropdown.value) {
      params.paymentStatus = paymentStatusDropdown.value;
    } else {
      console.log('Payment Status parameter not selected.');
    }

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
      cellClient.textContent = income.client.name; // Assuming client is an object with a name property
      row.appendChild(cellClient);

      const cellIncomeType = document.createElement('td');
      cellIncomeType.textContent = income.income_type.name; // Assuming income_type is an object with a name property
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
  });

document
  .querySelector('#add-income-button')
  .addEventListener('click', function () {
    // Open a form to input the new income data
  });

// JavaScript code to update the current date
document.getElementById('currentDate').innerText = 'Today is ' + getCurrentDate();

function getCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
}


