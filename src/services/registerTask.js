

document.getElementById('registerTask').addEventListener('submit', function (event) {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');

    const title = document.getElementById('inputTitle').value;
    const description = document.getElementById('validationDescription').value;
    const date = document.getElementById('calendar').value;
    const tags = document.getElementById('inputCategory').value;
    const status = "Pending";

    console.log(title, description, date, tags, status)

    fetch('http://localhost:8000/task-schedule/api/task/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({title, description, date, tags, status})
    })
    .then(response => {
        console.log(response)

        if (!response.ok) {
            console.error('Erro ao registrar task:', error);
            const errorRegisterTask = document.getElementById('alert');
                errorRegisterTask.innerHTML = '';

                errorRegisterTask.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show mt-4 text-center" role="alert">
                    <strong>Ocorreu um erro ao salvar a tarefa. Por favor, tente novamente.</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            }
            return response.json();
        })
        .then(data => {

            console.log('Resposta da API:', data);

            // redirect page home
            window.location.href = 'home.html';
        })
        .catch(error => {
            // Captura e lida com erros
            console.error('Erro na requisição:', error);
        }
        )
    }
)