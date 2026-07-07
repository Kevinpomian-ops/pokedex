let visiblePokemons = 20;
let activePokemon = 0;

let offset = 0;
const limit = 20;



function renderPokeCards(pokemonList = pokemons) {
    document.getElementById('card').innerHTML = "";
    for (let index = 0; index < visiblePokemons && index < pokemonList.length; index++) {
        const element = pokemonList[index];
        console.log(index, element);

        document.getElementById("card").innerHTML += cardTemplate(element, index);
    }
};

function renderDialog(index) {
    const pokemon = pokemons[index];
    let dialog = "";
    dialog += dialogTemplate(pokemon);
    document.getElementById('dialog').innerHTML = dialog;
    showTab("about")
}

function openDialog(id) {
    const pokemon = pokemons.find(p => p.id === id);

    activePokemon = pokemons.indexOf(pokemon);

    document.getElementById("dialog").showModal();
    document.body.classList.add("no-scroll");

    renderDialog(activePokemon);
}

function nextPokemon() {
    activePokemon++;

    if (activePokemon >= pokemons.length) {
        activePokemon = 0;
    };
    renderDialog(activePokemon);
}

function lastPokemon() {
    activePokemon--;

    if (activePokemon < 0) {
        activePokemon = pokemons.length - 1;
    }

    renderDialog(activePokemon);
}

function closeDialog() {
    document.getElementById('dialog').close();
    document.body.classList.remove("no-scroll");
}

function showTab(tabName) {
    document.getElementById("about").classList.remove("active")
    document.getElementById("stats").classList.remove("active")
    document.getElementById("moves").classList.remove("active")

    document.getElementById("btn-about").classList.remove("selected")
    document.getElementById("btn-stats").classList.remove("selected")
    document.getElementById("btn-moves").classList.remove("selected")

    document.getElementById(tabName).classList.add("active")
    document.getElementById("btn-" + tabName).classList.add("selected")
}

async function showMore() {
    await loadPokemons();
    visiblePokemons += 20;
    renderPokeCards();
}

function showLess() {
    visiblePokemons = 20;
    renderPokeCards();
}

function searchPokemon() {
    const search = document.getElementById("search").value.toLowerCase().trim();
    if (search.length < 3) {
        renderPokeCards();
        return;
    }
    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search)
    );
    renderPokeCards(filteredPokemons);
}

async function loadPokemons() {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    const data = await response.json();

    for (const pokemon of data.results) {
        const response = await fetch(pokemon.url);
        const details = await response.json();

        pokemons.push(details);
    }

    offset += limit;
}

async function preload() {
    await loadPokemons();
    renderPokeCards();
};

