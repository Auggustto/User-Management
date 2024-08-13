



function setTaskId(taskId) {
    document.getElementById('task_id').value = taskId;
}

document.getElementById('confirmDelete').addEventListener('click', deleteTask);

function deleteTask() {

    console.log("dentro da função delete")

    const taskId = document.getElementById('task_id').value;
    const token = localStorage.getItem('jwt');
    const id = localStorage.getItem('id');
    
    if (token && id) {
        fetch('http://localhost:8000/task-schedule/api/task/' + parseInt(taskId), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("delete", data);

            
            // Fechar o modal após a exclusão
            $('#ExemploModalCentralizado').modal('hide');
            // reload page
            window.location.reload(true);

        }
    )}
}


// server
// http://srv579221.hstgr.cloud:8000/task-schedule/api/user/

