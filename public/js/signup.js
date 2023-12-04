const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName').value.trim();
    const lastName = document.querySelector('#lastName').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const confirmPassword = document.querySelector('#confirmPassword').value.trim();
  
    if (firstName && lastName && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      try {
        const response = await fetch('/users/signup', {
          method: 'POST',
          body: JSON.stringify({ firstName, lastName, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/login'); // Redirect to login page after successful signup
        } else {
          const data = await response.json();
          alert(data.message || 'Failed to sign up');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup');
      }
    }
  };
  
  document.querySelector('#signup').addEventListener('submit', signupFormHandler);
