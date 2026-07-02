let pokemons =[]

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
        <label for= "checkbox" >
            <input type="checkbox" class="cards_button" hidden>
                <div class="cards">
                    <div id="poke_name">
                        <h3>${element.name}</h3>
                    </div>
                    <div id="poke_img">
                        <img src="${element.sprites.front_default}" alt="x">
                    </div>
                    <div id="poke_element">
                        <img src="" alt="x">
                            <img src="x" alt="x">
                            <p>${element.types[0].type.name}</p>
                            </div>

                    </div>
                </label>
                `
}};

async function preload() {
    const data = await fetchData();

    for (const pokemon of data.results) {
        const response = await fetch(pokemon.url);
        const details = await response.json();

        pokemons.push(details);
    }

    renderPokeCards();
}