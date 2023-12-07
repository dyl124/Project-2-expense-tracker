document.getElementById("myForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    

    try {
        // Get values from input fields
        const incomeNameInput = document.getElementById('incomeName');
        const clientNameInput = document.getElementById('clientName');
        const amountInput = document.getElementById('amount');
        const issueDateInput = document.getElementById('issueDate');
        const dueDateInput = document.getElementById('dueDate');
        const paymentStatusSelect = document.getElementById('paymentStatus');
        const descriptionInput = document.getElementById('description');
        const invoiceNumberInput = document.getElementById('invoiceNumber');

        const incomeName = incomeNameInput.value;
        const clientName = clientNameInput.value;
        const amount = amountInput.value;
        const issueDate = issueDateInput.value;
        const dueDate = dueDateInput.value;
        const paymentStatus = paymentStatusSelect.value;
        const description = descriptionInput.value;
        const invoiceNumber = invoiceNumberInput.value;
        // Create FormData object
        const formData = new FormData();
        formData.append('income_name', incomeName);
        formData.append('client_name', clientName);
        formData.append('amount', amount);
        formData.append('issue_date', issueDate);
        formData.append('due_date', dueDate);
        formData.append('payment_status', paymentStatus);
        formData.append('description', description);
        formData.append('invoice_id', invoiceNumber);

        // Convert FormData to object
        const formDataObject = Object.fromEntries(formData);
        console.log(formDataObject);

        // Send data as JSON for api/income/type route
        const responseIncomeType = await fetch("/api/income/type", {
            method: "POST",
            body: JSON.stringify({ 
            "type_id": incomeId,
             "income_name": incomeName,}),
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
            body: JSON.stringify({"client_id": clientId,
                "client_name": clientName,
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
                formDataObject,
                'amount': amount,
                'issue_date': issueDate,
                'due_date': dueDate,
                'payment_status': paymentStatus,
                'description': description,
                'invoice_id': invoiceNumber,
                'client_id': clientId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!responseType.ok) {
            throw new Error(`HTTP error! Status: ${responseType.status}`);
        }
if (responseType.ok) {
    console.log("new income recieved.");
    alert('new income recieved.');
};
        // Handle responses if needed

    } catch (err) {
        console.error("Error:", err);
        // Handle errors
    }
});
