// This will show the appropriate form depending on what the user selects

document
  .getElementById('transactionType')
  .addEventListener('change', function () {
    const transactionType = this.value;

    if (transactionType === 'income') {
      document.getElementById('incomeFields').style.display = 'block';
      document.getElementById('expenseFields').style.display = 'none';
    } else if (transactionType === 'expense') {
      document.getElementById('incomeFields').style.display = 'none';
      document.getElementById('expenseFields').style.display = 'block';
    }
  });

// Event listener for add transaction form to make appropriate fetch requests
document
  .getElementById('addTransactionForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const transactionType = document.getElementById('transactionType').value;

    let url;
    let data;

    if (transactionType === 'income') {
      url = '/api/income/addincome';
      data = {
        // TO DO: Get data from income fields
      };
    } else if (transactionType === 'expense') {
      url = '/api/expense/addexpense';
      data = {
        // TO DO: Get data from expense fields
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Transaction added successfully');
    } else {
      console.error('Error:', response.statusText);
    }
  });

//If the user selects 'Add New' from the client select, show the form for adding a new client
const clientSelect = document.getElementById('addIncomeClientSelect');

// Add an event listener for the 'change' event on the client select
clientSelect.addEventListener('change', function () {
  if (this.value === 'add_new') {
    // Show the form for adding a new client
    document.getElementById('addClientForm').style.display = 'block';
  } else {
    // Hide the form for adding a new client
    document.getElementById('addClientForm').style.display = 'none';
  }
});
