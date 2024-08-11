
// Fetch data from API
const BASE_URL = 'http://srv579221.hstgr.cloud:8000/task-schedule/api/user/login';

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        console.log(response)

        if (response.ok) {
            const data = await response.json();

            console.log(data)

            // Salvar os dados de login e JWT em cache
            localStorage.setItem('email', JSON.stringify(data.email)); 
            localStorage.setItem('jwt', data.token);

            window.location.href = 'src/pages/home.html';

        } else {
            const errorLogin = document.getElementById('errorLogin');
            errorLogin.innerHTML = '';

            errorLogin.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    E-mail ou Senha incorretos.
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        const errorLogin = document.getElementById('errorLogin');
            errorLogin.innerHTML = '';

            errorLogin.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Erro interno.
                </div>
            `;
    }
});





