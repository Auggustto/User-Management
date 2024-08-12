document.addEventListener("DOMContentLoaded", function () {
    const profileElement = document.getElementById('name');
    const tasksElement = document.getElementById('tasks');

    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');

    if (token && id) {
        fetch('http://srv579221.hstgr.cloud:8000/task-schedule/api/user/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("metadados", data);

                document.getElementById('name').innerHTML = `
                    ${data.name}
                `;

                // Verifica se existem tarefas e cria a tabela
                if (data.tasks && data.tasks.length > 0) {
                    let tableHTML = `
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">id</th>
                                <th scope="col" class="text-center">Tag</th>
                                <th scope="col" class="text-center">Titulo</th>
                                <th scope="col" class="text-center">Criado</th>
                                <th scope="col" class="text-center">Status</th>
                                <th scope="col" class="text-center">opções</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                    // Adiciona uma linha para cada tarefa
                    data.tasks.forEach((task, index) => {
                        tableHTML += `
                        <tr>
                            <td class="text-center">${index + 1}</td>
                            <td class="text-center">${task.tags}</td>
                            <td class="text-center">${task.title}</td>
                            <td class="text-center">${task.created_at}</td>
                            <td class="text-center">${task.status}</td>
                            <td class="text-center">
                                <button type="button"
                                    class="btn btn-outline-info btn-sm">Visualizar</button>
                                <button type="button"
                                    class="btn btn-outline-danger btn-sm">Excluir</button>
                            </td>
                        </tr>
                    `;
                    });

                    tableHTML += `
                        </tbody>
                    </table>
                `;

                    tasksElement.innerHTML = tableHTML;
                } else {
                    tasksElement.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        Poxa.. Nenhuma tarefa cadastrada <a href="#" class="alert-link">clique aqui para cadastrar</a>.
                    </div>
                `;
                }
                //  verificar token 
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
