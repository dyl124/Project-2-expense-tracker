const registerFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector('#registerFirstName').value.trim();
  const lastName = document.querySelector('#registerLastName').value.trim();
  const email = document.querySelector('#registerEmail').value.trim();
  const password = document.querySelector('#registerPassword').value.trim();
  const confirmPassword = document.querySelector('#registerConfirmPassword').value.trim();

  if (firstName && lastName && email && password && confirmPassword) {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

try {
  const response = await fetch('/user/register', {
    method: 'POST',
    body: JSON.stringify({firstName, lastName, email, password, confirmPassword}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
     

      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to login page after successful register
        alert('user created successfully');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to sign up');
      }
    } catch (error) {
      console.error('Error during register:', error);
      alert('An error occurred during register');
    }
  }
};

document
  .querySelector('#register-form')
  .addEventListener('submit', registerFormHandler);


