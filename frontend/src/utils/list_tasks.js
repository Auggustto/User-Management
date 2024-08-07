const taskTable = document.getElementById('Taskstable');
// const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 20;
let offset = 0;

function convertTasksToHtml(task) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
};

function loadTasksItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((tasks = []) => {
        const newHtml = tasks.map(convertTasksToHtml).join('')
        taskTable.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItems(offset, limit);
})