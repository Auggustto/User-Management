
// Fetch data from API
const BASE_URL = 'http://srv579221.hstgr.cloud:8000/task-schedule/api/user';

document.getElementById('createAccount').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        console.log(response)

        if (response.ok) {
            const data = await response.json();

            console.log(data)

            // // Salvar os dados de login e JWT em cache
            // localStorage.setItem('user', JSON.stringify(data.user)); 
            // localStorage.setItem('jwt', data.token);

            // // Redirecionar ou realizar outra ação após o login
            window.location.href = '../../index.html';
        } else {

            if (response == "E-mail already in use"){
                const errorEmail = document.getElementById('errorEmail');
                errorEmail.innerHTML = '';

                errorEmail.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        E-mail já cadastrado.
                    </div>
                `;
                
            }else {
                // alert('Falha no login. Verifique suas credenciais.');
                const errorLogin = document.getElementById('errorCreateAccount');
                errorLogin.innerHTML = '';

                errorLogin.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        E-mail ou Senha incorretos.
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});
