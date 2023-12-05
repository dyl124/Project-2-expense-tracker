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
    const incomes = await response.json();
    console.log(incomes);
    // Get the table body
    const tbody = document.querySelector('table tbody');

    // Clear the existing table data

    tbody.innerHTML = '';

    // Loop over the fetched data and create new rows for each item
    incomes.forEach((income) => {
      const row = document.createElement('tr');

      // Create a new cell for each property of the item
      // TODO need to specify which properties to display
      for (let key in income) {
        const cell = document.createElement('td');
        cell.textContent = item[key];
        row.appendChild(cell);
      }

      tbody.appendChild(row);
    });
  });

document
  .querySelector('#add-income-button')
  .addEventListener('click', function () {
    // Open a form to input the new income data
  });
