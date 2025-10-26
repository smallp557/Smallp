function login() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Simple, hardcoded credentials for demonstration purposes only.
    // In a real application, this would involve server-side validation.
    const adminUsername = 'smallp';
    const adminPassword = 'smallp123'; 

    if (usernameInput === adminUsername && passwordInput === adminPassword) {
        messageElement.textContent = 'Login successful! Redirecting to admin panel...';
        messageElement.style.color = 'green';
        // In a real application, you would redirect to an admin dashboard.
        // For this example, we'll just show an alert.
        setTimeout(() => {
            alert('Welcome, Admin!');
             window.location.href = 'East_Junction.html'; // Uncomment for redirection
        }, 1000);
    } else {
        messageElement.textContent = 'Invalid username or password.';
        messageElement.style.color = 'red';
    }
}