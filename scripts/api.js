let pokemons = []
let currentPokemonList = [];

// async function fetchData(limit, offset) {
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100');
//     const responseToJson = await response.json();
//     console.log(responseToJson);
//     return responseToJson;
// }

async function fetchData(limit, offset) {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );

    return await response.json();
}