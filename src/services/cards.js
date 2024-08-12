document.addEventListener("DOMContentLoaded", function () {

    const cards = document.getElementById('card');
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

                console.log("metadados", data.status_count);

                if (data.status_count) {
                    cards.innerHTML = `

                        <!-- Open -->
                        <div class="col-md-4 col-xl-3">
                            <div class="card bg-c-blue order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20 text-center">Em aberto</h6>
                                    <h2 class="text-right">
                                        <i class="fa bi-clipboard2 f-left"></i><span>${data.status_count.Pending ?? 0}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <!-- Pending -->
                        <div class="col-md-4 col-xl-3">
                            <div class="card bg-c-yellow order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20 text-center">Em progresso</h6>
                                    <h2 class="text-right"><i class="fa fa-refresh f-left"></i><span>${data.status_count.InProgress ?? 0}</span></h2>
                                </div>
                            </div>
                        </div>

                        <!-- Closed -->
                        <div class="col-md-4 col-xl-3">
                            <div class="card bg-c-green order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20 text-center">Finalizados</h6>
                                    <h2 class="text-right"><i class="fa bi-check-circle f-left"></i><span>${data.status_count.Completed ?? 0}</span></h2>

                                </div>
                            </div>
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
