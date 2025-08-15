document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim().toLowerCase();
            const password = document.getElementById('password').value;

            if (username === 'worker3' && password === 'JAFFa!17') {
                window.location.href = 'files.html';
            } else {
                document.getElementById('error-msg').style.display = 'block';
            }
        });
    }
});
