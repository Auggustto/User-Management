

document.getElementById('registerTask').addEventListener('submit', function (event) {
    event.preventDefault();

    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');

    const title = document.getElementById('inputTitle').value;
    const category_id = document.getElementById("inputCategory").value;
    const description = document.getElementById('validationDescription').value;
    const date = document.getElementById('calendar').value;
    const status = "Pending";
    
    const tags = "remover";

    console.log(title, description, date, tags, status)

    fetch('http://localhost:8000/task-schedule/api/task/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({title, description, date, tags, status, category_id})
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

// List of category
document.addEventListener("DOMContentLoaded", function () {

    const category = document.getElementById('inputCategory');
    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');

    // server
    // http://srv579221.hstgr.cloud:8000/task-schedule/api/user/

    if (token && id) {
        fetch('http://localhost:8000/task-schedule/api/category/all/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data) {

                    let categoryHTML = `
                    <select id="inputCategory" class="form-control">
                        <option selected>Escolher...</option>
                    `;
                    
                    data.forEach((cat, index) => {
                        
                        console.log("cat", cat.category)
                        
                        categoryHTML += `
                            <option value=${cat.id} >${cat.category}</option>
                        `;
                    });
                    categoryHTML += `</select>`;
                    category.innerHTML = categoryHTML;
                }

            //  Token expired
            if (data.detail === "Token has expired") {
                window.location.href = 'login.html';
            }

            })
            .catch(error => {
                console.error('Erro ao buscar tarefas:', error);
            });
    } else {
        console.error('Token ou email não encontrados no cache');
    }
});
