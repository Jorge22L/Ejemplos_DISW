async function fetchPokemon(){
    const pokemon_name = document.getElementById('pokemon').value.toLowerCase().trim();
    document.getElementById('data').innerHTML = '<p>Cargando datos...</p>';
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`);
        if(!response.ok){
            throw new Error('Error en la petición');
        }
        const pokemon = await response.json();
        const abilities = pokemon.abilities.map(ability => ability.ability.name);
        const type = pokemon.types.map(type => type.type.name);
        const pokemonHTML = `
        <thead>
            <tr>
                <th>Pokemon</th>
                <th>Imagen</th>
                <th>Altura</th>
                <th>Peso</th>
                <th>Tipo</th>
                <th>Habilidades</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>${pokemon.name}</h2>
            <td><img src="${pokemon.sprites.front_default}"></td>
            <td>Altura: ${pokemon.height / 10} m</td>
            <td>Peso: ${pokemon.weight / 10} kg</td>
            <td>${type}</td>
            <td>${abilities}</td>
        </tr>
        </tbody>
        `;
        document.getElementById('data').innerHTML = pokemonHTML;

    } catch (error) {
        console.error("Error al recuperar datos ",error);
        document.getElementById('data').innerHTML = '<p>Error al cargar datos</p>';
    }
}

/* funciones para mostrar la lista de los primeros 151 pokemon
    No implementadas
*/

async function fetchPokemonList() {
    const table = document.getElementById('data');
    table.innerHTML = '<tr><th>Nombre</th><th>Imagen</th></tr>'; // Reset table
    try {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const data = await response.json();
        for (const pokemon of data.results) {
            await addPokemonRow(pokemon.url);
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
        table.innerHTML += '<tr><td colspan="2">Error al cargar los datos de los Pokémon.</td></tr>';
    }
}

async function addPokemonRow(pokemonUrl) {
    const response = await fetch(pokemonUrl);
    const pokemon = await response.json();
    const row = `
        <tr>
            <td>${pokemon.name}</td>
            <td><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="width:50px;height:50px;"/></td>
        </tr>
    `;
    document.getElementById('data').innerHTML += row;
}
