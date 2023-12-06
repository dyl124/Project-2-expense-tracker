function fetchData(userId) {
  // Define the base URL
  const baseUrl = 'http://localhost:3001/api/income?';

  // Define a where clause for the query
  let whereClause = {
    user_id: userId,
  };

  // Checkboxes (replace these with your actual checkbox elements)
  const invoiceIdCheckbox = document.getElementById('invoiceId');
  const incomeTypeCheckbox = document.getElementById('incomeType');
  const clientCheckbox = document.getElementById('clientCheckbox');
  const paymentStatusCheckbox = document.getElementById('paymentStatus');

  // If invoice_id checkbox is checked, add it to the where clause
  if (invoiceIdCheckbox.checked && req.query.invoice_id) {
    whereClause.invoice_id = req.query.invoice_id + "&";
  } else {
    console.log('Invoice ID parameter not checked.');
  }

  if (incomeTypeCheckbox.checked && req.query.incomeType) {
    whereClause.incomeType = req.query.incomeType + "&";
  } else {
    console.log('Income Type parameter not checked.');
  }

  if (clientCheckbox.checked && req.query.client) {
    whereClause.client = req.query.client + "&";
  } else {
    console.log('Client parameter not checked.');
  }

  if (paymentStatusCheckbox.checked && req.query.paymentStatus) {
    whereClause.paymentStatus = req.query.paymentStatus + "&";
  } else {
    console.log('Payment Status parameter not checked.');
  }

  // Construct the URL with the parameters
  const urlWithParams = new URL(baseUrl);
  urlWithParams.search = new URLSearchParams(whereClause);

  // Fetch data using the constructed URL
  fetch(urlWithParams)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process the fetched data
      console.log(data);
    })
    .catch(error => {
      // Handle errors
      console.error('Fetch error:', error);
    });
}

// Example usage with a user ID
const userId = '123';
fetchData(userId);
