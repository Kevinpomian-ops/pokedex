let pokemons = []

async function fetchData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100');
    const responseToJson = await response.json();
    console.log(responseToJson);
    return responseToJson;
}
