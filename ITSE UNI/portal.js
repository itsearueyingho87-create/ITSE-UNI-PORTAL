const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const formTitle = document.getElementById('form-title');

// Toggle forms
showRegister.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formTitle.textContent = 'Student Registration';
});

showLogin.addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.textContent = 'Student Login';
});

// Dummy login/register functionality
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Replace this with actual backend call
    if(email && password){
        alert(`Welcome back, ${email}! Redirecting to Student Portal...`);
        window.location.href = "main-student-portal.html"; // Redirect to main portal
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    // Replace this with actual backend call
    if(name && email && password){
        alert(`Registration successful! Welcome, ${name}. Redirecting to Student Portal...`);
        window.location.href = "main-student-portal.html"; // Redirect to main portal
    }
});
