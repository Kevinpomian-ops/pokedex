function cardTemplate(element, index) {
    return `
        <div class="cards" onclick="openDialog(${index})">
            <input type="checkbox" class="cards_button" hidden>
            <div class="cards-content type-${element.types[0].type.name}">
                <div id="poke_name">
                    <h3>${element.name}</h3>
                </div>

                <div id="poke_img">
                    <img src="${element.sprites.front_default}" alt="x">
                </div>

                <div id="poke_element">
                    <img src="./assets/types/${element.types[0].type.name}.svg" alt="x">
                    <p>${element.types[0].type.name}</p>
                </div>
            </div>
        </div>
    `;
}

function dialogTemplate(pokemon, index) {
    return `
        <div id="dialog_content" class="dialog type-${pokemon.types[0].type.name}">
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
                    <p><strong>Height:</strong> ${pokemon.height}cm</p>
                    <p><strong>Weight:</strong> ${pokemon.weight}kg</p>
                    <p><strong>Base Experience:</strong> ${pokemon.base_experience}xp</p>
                    <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(", ")}</p>
                </div>


                <div id="stats" class="tab">
                    ${pokemon.stats.map(stat => ` 
                        <p><strong>${stat.stat.name}:</strong> ${stat.base_stat}</p>
                    `).join("")}
                </div>

                <div id="moves" class="tab">
                    ${pokemon.moves.slice(0, 10).map(move => `
                    <p>${move.move.name}</p>
                    `).join("")}
                </div>

                
                <div id="navBar" class="nav-bar">
                        <button class="nav-button" onclick="lastPokemon()">⬅️</button>
                        <button class="nav-button" onclick="nextPokemon()">➡️</button>
                </div>
            </div>
        </div>
    `
}