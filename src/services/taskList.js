document.addEventListener("DOMContentLoaded", function () {
    const profileElement = document.getElementById('name');
    const tasksElement = document.getElementById('tasks');

    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');

    // server
    // http://srv579221.hstgr.cloud:8000/task-schedule/api/user/

    if (token && id) {
        fetch('http://localhost:8000/task-schedule/api/user/' + id, {
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

                if (data.tasks && data.tasks.length > 0) {
                    let tableHTML = `
                    <table class="table table-hover">
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
                        console.log("tasks", task);

                        tableHTML += `
                        <tr>
                            <td class="text-center">${index + 1}</td>
                            <td class="text-center">${task.tags}</td>
                            <td class="text-center">${task.title}</td>
                            <td class="text-center">${task.created_at}</td>
                            <td id="${task.status}" class="text-center">${task.status}</td>
                            <td class="text-center">
                                <div class="d-flex justify-content-end align-self-center">

                                    <button type="button" class="btn btn-outline-danger mr-2" onclick="setTaskId(${task.id})"
                                        data-toggle="modal" data-target="#ExemploModalCentralizado">
                                        <i class="bi bi-trash"></i>
                                    </button>

                                    <form action="/edit" method="post" style="display:inline;">
                                        <button type="submit" class="btn btn-outline-primary mr-2"><i
                                                class="bi bi-pencil"></i></button>
                                    </form>

                                    <form action="/view" method="post" style="display:inline;">
                                        <button type="submit" class="btn btn-outline-success mr-2"><i
                                                class="bi bi-check"></i></button>
                                    </form>

                                </div>
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
                    <div class="alert alert-warning mt-4" role="alert">
                        Poxa... você ainda não tem nenhuma tarefa cadastrada. <a href="/src/pages/registerTask.html" class="alert-link">Clique aqui para cadastrar.</a>.
                    </div>
                `;
                }
                //  verificar token 
                if (data.detail === "Token has expired") {
                    window.location.href = '../../index.html ';
                }

            })
            .catch(error => {
                console.error('Erro ao buscar tarefas:', error);
            });
    } else {
        console.error('Token ou email não encontrados no cache');
    }
});
