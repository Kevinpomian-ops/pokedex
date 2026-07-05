let pokemons = []



async function fetchData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=35');
    const responseToJson = await response.json();
    console.log(responseToJson);
    return responseToJson;
}

function renderPokeCards() {
    for (let index = 0; index < pokemons.length; index++) {
        const element = pokemons[index];
        document.getElementById('card').innerHTML += `
        <div class="cards" onclick="openDialog(${index})" >
            <input type="checkbox" class="cards_button" hidden>
                <div class="cards">
                    <div id="poke_name">
                        <h3>${element.name}</h3>
                    </div>
                    <div id="poke_img">
                        <img src="${element.sprites.front_default}" alt="x">
                    </div>
                    <div id="poke_element">
                        <img src="./assets/types/${element.types[0].type.name}.svg" alt="x">
                        <p>${element.types[0].type.name}</p>
                        <img src="./assets/types/${element.types[0].type.name}.svg" alt="x">
                        <p>${element.types[0].type.name}</p>
                    </div>

                </div>
        </div>
`
    }
};

function renderDialog(index) {
    const pokemon = pokemons[index];
    let dialog = "";
    dialog += `
             <div id="dialog_content">
            <div id="dialog_header">
            <button id="close_dialog" onclick="closeDialog()">X</button>
                <h2>${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}">
            </div>
            <div id="dialog_body">
                <div class="tabs">
                    <button onclick="showTab('about')" id="btn-about">
                        <h3>About</h3>
                    </button>

                    <button onclick="showTab('stats')" id="btn-stats">
                        <h3>Stats</h3>
                    </button>

                    <button onclick="showTab('moves')" id="btn-moves">
                        <h3>Moves</h3>
                    </button>
                </div>

                <div id="about" class="tab">
                    <p><strong>Height:</strong> ${pokemon.height}</p>
                    <p><strong>Weight:</strong> ${pokemon.weight}</p>
                    <p><strong>Base Experience:</strong> ${pokemon.base_experience}</p>
                    <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(", ")}</p>
                </div>


                <div id="stats" class="tab">
                    ${pokemon.stats.map(stat =>` 
                        <p>${stat.stat.name}: ${stat.base_stat}</p>
                    `).join("")}
                </div>

                <div id="moves" class="tab">
                    ${pokemon.moves.slice(0, 10).map(move => `
                    <p>${move.move.name}</p>
                    `).join("")}
                </div>


            </div>
        </div>
    `
    document.getElementById('dialog').innerHTML = dialog;
    showTab("about")
}

function openDialog(index) {
    document.getElementById('dialog').showModal();
    renderDialog(index);
}

function closeDialog() {
    document.getElementById('dialog').close()
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

async function preload() {
    const data = await fetchData();
    for (const pokemon of data.results) {
        const response = await fetch(pokemon.url);
        const details = await response.json();

        pokemons.push(details);
    }
    renderPokeCards();
    console.log(pokemons);
}

