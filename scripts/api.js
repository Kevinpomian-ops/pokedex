
async function fetchData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=35');
    console.log(response);
    const responseToJson = await response.json();
    console.log(responseToJson);

    document.getElementById('title').innerHTML = responseToJson.name;
}
fetchData()