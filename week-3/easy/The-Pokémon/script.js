async function getAllPokemonByType(type) {
    const data = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const parsedData = await data.json();

    const pokemons = parsedData.pokemon;
    return pokemons;
}

async function getNPokemons(type, number) {
    const allPokemons = await getAllPokemonByType(type);
    let answer = []
    if (allPokemons.length <= number) {
        answer = allPokemons;
    } else {
        answer = allPokemons.splice(0, number);
    }
    return answer;
}

async function getDetailedPokemons(type, number) {
    const pokemonInfo = await getNPokemons(type, number);
    let answer = [];
    for (let i = 0; i < pokemonInfo.length; i++) {
        let detailedInfo = await fetch(pokemonInfo[i].pokemon.url);
        detailedInfo = await detailedInfo.json();
        answer.push(detailedInfo);
    }
    return answer;
}

function generateCardDiv(pokemonData) {
    const card = document.createElement("div");
    card.id = pokemonData.id;
    const avatar = document.createElement("img");
    avatar.setAttribute("src", pokemonData.sprites.front_default);
    const name = document.createElement("h3");
    name.innerText = pokemonData.name;
    card.appendChild(avatar);
    card.appendChild(name);

    return card;
}

async function fetchPokemon() {
    const type = document.getElementById("type-of-pokemon").value;
    const number = parseInt(document.getElementById("number-of-pokemon").value);

    const result = await getDetailedPokemons(type, number);
    cards = [];
    for (let i = 0; i < result.length; i++) {
        cards.push(generateCardDiv(result[i]));
    }
    document.getElementById("cards-container").innerHTML = "";
    for(let card of cards)
        document.getElementById("cards-container").appendChild(card);
}
