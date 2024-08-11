// Fetch data from API
const BASE_URL = 'http://srv579221.hstgr.cloud:8000/task-schedule/api/task/';

// Recuperando JWT e email do localStorage
const token = localStorage.getItem('jwt');
const email = localStorage.getItem('email');

if (token && email) {

    fetch('http://srv579221.hstgr.cloud:8000/task-schedule/api/task/'+email, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }})
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Erro ao buscar tarefas:', error);
    });
} 
else {
    console.error('Token ou email não encontrados no cache');
}





// document.getElementById('loginForm').addEventListener('submit', async function (event) {
//     event.preventDefault();

//     const email = document.getElementById('inputEmail').value;
//     const password = document.getElementById('inputPassword').value;

//     try {
//         const response = await fetch(BASE_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         });

//         console.log(response)

//         if (response.ok) {
//             const data = await response.json();

//             console.log(data)

//             // Salvar os dados de login e JWT em cache
//             localStorage.setItem('email', JSON.stringify(data.email)); 
//             localStorage.setItem('jwt', data.token);

//             window.location.href = 'src/pages/home.html';

//         } else {
//             const errorLogin = document.getElementById('errorLogin');
//             errorLogin.innerHTML = '';

//             errorLogin.innerHTML = `
//                 <div class="alert alert-danger" role="alert">
//                     E-mail ou Senha incorretos.
//                 </div>
//             `;
//         }
//     } catch (error) {
//         console.error('Erro ao fazer login:', error);
//         const errorLogin = document.getElementById('errorLogin');
//             errorLogin.innerHTML = '';

//             errorLogin.innerHTML = `
//                 <div class="alert alert-danger" role="alert">
//                     Erro interno.
//                 </div>
//             `;
//     }
// });
