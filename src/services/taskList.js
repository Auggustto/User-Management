
// Fetch data from API
const BASE_URL = 'http://localhost:8000/task-schedule/api/user/leonardo@gmail.com';

export function listTasks(endpoint) {
    const response = fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
        throw new Error('Internal server error');
    }
    return response.json();
}


