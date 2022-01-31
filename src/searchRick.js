import {
    searchRickMortyAPI
} from './apiRick.js';

const apiRickMorty = 'https://rickandmortyapi.com/api/';

async function searchCharacter(nameCharacther) {
    const characters = await searchRickMortyAPI(apiRickMorty + `/character/?name=${nameCharacther} `, 'Personaje');
    return characters.results[0];
}

async function searcCharactersEpisodes(urlEpisode) {
    const episode = await searchRickMortyAPI(urlEpisode, 'Episodio');
    return episode.characters;
}

async function searcCharactersById(urlCharacterId) {
    const character = await searchRickMortyAPI(urlCharacterId, 'Personaje');
    return {
        id: character.id,
        name: character.name
    };
}

function sortArrayObjectBy(array, value) {
    array.sort(((a, b) => {
        if (a[value] > b[value]) {
            return 1;
        }
        if (a[value] < b[value]) {
            return -1;
        }
        return 0;
    }))
    return array;
}

function getArrayCharacters(episodeCompanions) {
    let characters = [];

    episodeCompanions.forEach(episode => {
        episode.forEach(character => {
            characters.push(character)
        })
    })

    return characters;
}

function filterCharacters(characters, charactersSerched, urlPrincipalCharacter) {
    let charactFilter = [];

    charactFilter = characters.filter(urlCharacterId => urlCharacterId !== urlPrincipalCharacter && !charactersSerched.includes(urlCharacterId))

    return charactFilter;
}

async function getEpisodeCharacters(urlEpisode, charactersSerched, urlCharacter) {
    let promisesCharacter = [];
    let charactersEpisode = await searcCharactersEpisodes(urlEpisode);

    charactersEpisode = filterCharacters(charactersEpisode, charactersSerched, urlCharacter)

    charactersEpisode.forEach(urlCharacterId => {
        promisesCharacter.push(searcCharactersById(urlCharacterId));
        charactersSerched.push(urlCharacterId);
    })
    return Promise.all(promisesCharacter);
}

async function getCompanions(nameCharacther) {
    const character = await searchCharacter(nameCharacther);
    let episodePromises = [];
    let charactersSerched = [];

    character.episode.forEach(urlEpisode => {
        episodePromises.push(getEpisodeCharacters(urlEpisode, charactersSerched, character.url));
    })

    let companions = sortArrayObjectBy(getArrayCharacters(await Promise.all(episodePromises)), 'name');
    return companions;
}


export {
    searchCharacter,
    getCompanions
}