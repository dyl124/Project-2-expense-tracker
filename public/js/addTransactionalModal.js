// This will show the appropriate form depending on what the user selects
const transactionType = document.getElementById('transactionType');

transactionType.addEventListener('change', function () {
  const toggleClient = document.getElementById('nameReq');
  const toggleIncome = document.getElementById('toggleType');
  
  if (transactionType.value === 'income') {
    toggleClient.innerHTML = 'Client Name:';
    toggleIncome.innerHTML = 'Income Type:';

  } else if (transactionType.value === 'expense') {
    toggleClient.innerHTML = 'Vendor Name:';
    toggleIncome.innerHTML = 'Expense Type:';
  }
});
// Event listener for add transaction form to make appropriate fetch requests
const transactionForm = document.getElementById('addTransactionForm');
transactionForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const selectedTransactionType = document.getElementById('transactionType').value;

  if (selectedTransactionType === 'income') {
    try {
      // Get values from input fields
      const incomeIncomeNameInput = document.getElementById('incomeName');
      const incomeClientNameInput = document.getElementById('incomeClientName');
      const incomeAmountInput = document.getElementById('incomeAmount');
      const incomeIssueDateInput = document.getElementById('incomeIssueDate');
      const incomeDueDateInput = document.getElementById('incomeDueDate');
      const incomePaymentStatusSelect = document.getElementById('incomePaymentStatus');
      const incomeDescriptionInput = document.getElementById('incomeDescription');
      const incomeInvoiceNumberInput = document.getElementById('incomeInvoiceNumber');

      const incomeIncomeName = incomeIncomeNameInput.value;
      const incomeClientName = incomeClientNameInput.value;
      const incomeAmount = incomeAmountInput.value;
      const incomeIssueDate = incomeIssueDateInput.value;
      const incomeDueDate = incomeDueDateInput.value;
      const incomePaymentStatus = incomePaymentStatusSelect.value;
      const incomeDescription = incomeDescriptionInput.value;
      const incomeInvoiceNumber = incomeInvoiceNumberInput.value;

      // Create FormData object
      const formData = new FormData();
      formData.append('income_name', incomeIncomeName);
      formData.append('client_name', incomeClientName);
      formData.append('amount', incomeAmount);
      formData.append('issue_date', incomeIssueDate);
      formData.append('due_date', incomeDueDate);
      formData.append('payment_status', incomePaymentStatus);
      formData.append('description', incomeDescription);
      formData.append('invoice_id', incomeInvoiceNumber);

      // Convert FormData to object
      const formDataObject = Object.fromEntries(formData);

      // Send data as JSON for api/income/type route
      const responseIncomeType = await fetch("/api/income/type", {
        method: "POST",
        body: JSON.stringify({
          "income_name": incomeIncomeName,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!responseIncomeType.ok) {
        throw new Error(`HTTP error! Status: ${responseIncomeType.status}`);
      }

      const incomeTypeData = await responseIncomeType.json();
      const incomeId = incomeTypeData.id;

      // Send data as JSON for api/income/client route
      const responseClient = await fetch("/api/income/client", {
        method: "POST",
        body: JSON.stringify({ 
          "client_name": incomeClientName,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!responseClient.ok) {
        throw new Error(`HTTP error! Status: ${responseClient.status}`);
      }

      const clientData = await responseClient.json();
      const clientId = clientData.id;

      // Send data as JSON for api/income/income route
      const responseType = await fetch("/api/income/addincome", {
        method: "POST",
        body: JSON.stringify({
          "income_id": incomeId,
          'amount': incomeAmount,
          'issue_date': incomeIssueDate,
          'due_date': incomeDueDate,
          'payment_status': incomePaymentStatus,
          'description': incomeDescription,
          'invoice_id': incomeInvoiceNumber,
          'client_id': clientId,
          'type_id': incomeId,
          "income_name": incomeIncomeName,
          "client_name": incomeClientName,

        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!responseType.ok) {
        throw new Error(`HTTP error! Status: ${responseType.status}`);
      }

      if (responseType.ok){
       alert('New income received.');
       window.location.reload();
     }
    } catch (err) {
      console.error("Error:", err);
      // Handle errors
    }
  }

  if (selectedTransactionType === 'expense') {
    try {
      const transactionForm = document.getElementById('addTransactionForm');

      event.preventDefault();


      // Get values from input fields
      const incomeIncomeNameInput = document.getElementById('incomeName');
      const incomeClientNameInput = document.getElementById('incomeClientName');
      const incomeAmountInput = document.getElementById('incomeAmount');
      const incomeIssueDateInput = document.getElementById('incomeIssueDate');
      const incomeDueDateInput = document.getElementById('incomeDueDate');
      const incomePaymentStatusSelect = document.getElementById('incomePaymentStatus');
      const incomeDescriptionInput = document.getElementById('incomeDescription');
      const incomeInvoiceNumberInput = document.getElementById('incomeInvoiceNumber');

      const incomeIncomeName = incomeIncomeNameInput.value;
      const incomeClientName = incomeClientNameInput.value;
      const incomeAmount = incomeAmountInput.value;
      const incomeIssueDate = incomeIssueDateInput.value;
      const incomeDueDate = incomeDueDateInput.value;
      const incomePaymentStatus = incomePaymentStatusSelect.value;
      const incomeDescription = incomeDescriptionInput.value;
      const incomeInvoiceNumber = incomeInvoiceNumberInput.value;

      // Create FormData object
      const formData = new FormData();
      formData.append('income_name', incomeIncomeName);
      formData.append('vendor_name', incomeClientName);
      formData.append('amount', incomeAmount);
      formData.append('issue_date', incomeIssueDate);
      formData.append('due_date', incomeDueDate);
      formData.append('payment_status', incomePaymentStatus);
      formData.append('description', incomeDescription);
      formData.append('invoice_id', incomeInvoiceNumber);

      // Convert FormData to object
      const formDataObject = Object.fromEntries(formData);

      // Send data as JSON for api/income/type route
      const responseIncomeType = await fetch("/api/expense/type", {
        method: "POST",
        body: JSON.stringify({
          "expense_name": incomeIncomeName,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!responseIncomeType.ok) {
        throw new Error(`HTTP error! Status: ${responseIncomeType.status}`);
      }

      const incomeTypeData = await responseIncomeType.json();
      const incomeId = incomeTypeData.id;

      // Send data as JSON for api/income/client route
      const responseClient = await fetch("/api/expense/vendor", {
        method: "POST",
        body: JSON.stringify({
          "vendor_name": incomeClientName,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!responseClient.ok) {
        throw new Error(`HTTP error! Status: ${responseClient.status}`);
      }

      const clientData = await responseClient.json();
      const clientId = clientData.id;

      // Send data as JSON for api/income/income route
      const responseType = await fetch("/api/expense/addexpense", {
        method: "POST",
        body: JSON.stringify({
          "expense_id": incomeId,
          'amount': incomeAmount,
          'issue_date': incomeIssueDate,
          'due_date': incomeDueDate,
          'payment_status': incomePaymentStatus,
          'description': incomeDescription,
          'invoice_id': incomeInvoiceNumber,
          'vendor_id': clientId,
          'type_id': incomeId,
          "vendor_name": incomeClientName,
          "expense_name": incomeIncomeName,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!responseType.ok) {
        throw new Error(`HTTP error! Status: ${responseType.status}`);
      }
    if (responseType.ok){
      alert('New expense received.');
      window.location.reload();
    }
     
    

    } catch (error) {
      console.error('An error occurred:', error.message);
      // Handle the error or show an alert to the user
      alert('An error occurred. Please try again.');
    }
  }
});
