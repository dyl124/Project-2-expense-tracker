// JavaScript code to update the current date
document.getElementById('currentDate').innerText = 'Today is ' + getCurrentDate();

function getCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
}

