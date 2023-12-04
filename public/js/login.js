console.log('Hello');
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        //document.location.replace('/');
        console.log('successful');
      } else {
        alert('Failed to log in');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  }
};

document.querySelector('#loginBtn').addEventListener('click', loginFormHandler);
