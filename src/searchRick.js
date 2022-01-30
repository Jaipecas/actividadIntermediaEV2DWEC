import fetch from 'node-fetch';

const apiRickMorty = 'https://rickandmortyapi.com/api/';

async function searchRickMortyAPI(http, query) {
    try {
        const response = await fetch(http);
        if (response.status === 404) return Promise.reject(`${query} no encontrado`);
        if (response.status !== 200) return Promise.reject(`Error: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

async function searchCharacter(nameCharacther) {
    const characters = await searchRickMortyAPI(apiRickMorty + `/character/?name=${nameCharacther} `, 'Personaje');
    return characters.results[0];
}

async function searcCharactersEpisodes(httpEpisode) {
    const episode = await searchRickMortyAPI(httpEpisode, 'Episodio');
    return episode.characters;
}

async function searcCharactersById(httpCharacterId) {
    const character = await searchRickMortyAPI(httpCharacterId, 'Personaje');
    return {
        id: character.id,
        name: character.name
    };
}

/* function orderByCharacterNames(characters) {
    let charactersOrder = [];
    characters.forEach(arrayCharacters => {
        charactersOrder.concat(arrayCharacters);
    })

    charactersOrder.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });

} */

async function getEpisodeCharacters(httpEpisode, charactersSerched) {
    let promisesCharacter = [];
    let charactersEpisode = await searcCharactersEpisodes(httpEpisode);

    charactersEpisode.forEach(httpCharacterId => {
        if (!charactersSerched.includes(httpCharacterId)) {
            promisesCharacter.push(searcCharactersById(httpCharacterId));
            charactersSerched.push(httpCharacterId);
        }
    })
    return Promise.all(promisesCharacter);
}

async function getCompanions(nameCharacther) {
    const character = await searchCharacter(nameCharacther);
    let episodes = character.episode
    let episodePromises = [];
    let charactersSerched = [];

    episodes.forEach(httpEpisode => {
        episodePromises.push(getEpisodeCharacters(httpEpisode, charactersSerched));
    })

    let episodesCompanions = await Promise.all(episodePromises);

   // orderByCharacterNames(episodesCompanions);

    return episodesCompanions;
}


/* let result = await getCompanions('Armagheadon');
console.log(result); */


export {
    searchCharacter,
    getCompanions
}