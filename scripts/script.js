let visiblePokemons = 20;
let activePokemon = 0;
let offset = 0;
const limit = 20;
const dialog = document.getElementById("dialog");

dialog.addEventListener("close", () => {
    document.body.classList.remove("no-scroll");
});



function renderPokeCards(pokemonList = pokemons) {
    currentPokemonList = pokemonList;

    document.getElementById("card").innerHTML = "";

    for (let index = 0; index < pokemonList.length; index++) {
        document.getElementById("card").innerHTML += cardTemplate(pokemonList[index], index);
    }
}

function renderDialog(index) {
    const pokemon = currentPokemonList[index];
    let dialog = "";
    dialog += dialogTemplate(pokemon);
    document.getElementById('dialog').innerHTML = dialog;
    showTab("about");
}

function openDialog(id) {
    activePokemon = currentPokemonList.findIndex(p => p.id === id);

    dialog.showModal();
    document.body.classList.add("no-scroll");

    renderDialog(activePokemon);
}

function nextPokemon() {
    activePokemon++;

    if (activePokemon >= currentPokemonList.length) {
        activePokemon = 0;
    };
    renderDialog(activePokemon);
}

function lastPokemon() {
    activePokemon--;

    if (activePokemon < 0) {
        activePokemon = currentPokemonList.length - 1;
    }

    renderDialog(activePokemon);
}

function closeDialog() {
    dialog.close();
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
    const search = document.getElementById("search").value
        .toLowerCase()
        .trim();

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

    document.getElementById('dialog').close();
    dialog.addEventListener("close", () => {
    document.body.classList.remove("no-scroll");
    })
};

