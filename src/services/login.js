
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

            // // Salvar os dados de login e JWT em cache
            // localStorage.setItem('user', JSON.stringify(data.user)); 
            // localStorage.setItem('jwt', data.token);

            // // Redirecionar ou realizar outra ação após o login
            // window.location.href = '/pagina-protegida.html';
        } else {
            // Lidar com erro de login
            // alert('Falha no login. Verifique suas credenciais.');
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
    }
});





