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

function sortArrayObjectBy(array, value){
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

function sortByCharacterNames(episodeCompanions) {
    let characters = [];

    episodeCompanions.forEach(episode => {
        episode.forEach(character => {
            characters.push(character)
        })
    })

    return sortArrayObjectBy(characters, 'name');
}

function includeCharacter(charactersSerched, urlCharacterId, urlPrincipalCharacter) {
    if (urlCharacterId === urlPrincipalCharacter) {
        return true
    }
    if (charactersSerched.includes(urlCharacterId)) {
        return true
    }
    return false
}

async function getEpisodeCharacters(urlEpisode, charactersSerched, urlCharacter) {
    let promisesCharacter = [];
    const charactersEpisode = await searcCharactersEpisodes(urlEpisode);

    charactersEpisode.forEach(urlCharacterId => {
        if (!includeCharacter(charactersSerched, urlCharacterId, urlCharacter)) {
            promisesCharacter.push(searcCharactersById(urlCharacterId));
            charactersSerched.push(urlCharacterId);
        }
    })
    return Promise.all(promisesCharacter);
}

async function getCompanions(nameCharacther) {
    const character = await searchCharacter(nameCharacther);
    const episodes = character.episode;
    const urlCharacter = character.url;
    let episodePromises = [];
    let charactersSerched = [];

    episodes.forEach(urlEpisode => {
        episodePromises.push(getEpisodeCharacters(urlEpisode, charactersSerched, urlCharacter));
    })

    return sortByCharacterNames(await Promise.all(episodePromises));
}

let result = await getCompanions('Armagheadon')
console.log(result)

export {
    searchCharacter,
    getCompanions
}