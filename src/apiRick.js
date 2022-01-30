import fetch from 'node-fetch';

async function searchRickMortyAPI(url, query) {
    try {
        const response = await fetch(url);
        if (response.status === 404) return Promise.reject(`${query} no encontrado`);
        if (response.status !== 200) return Promise.reject(`Error: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

export {
    searchRickMortyAPI
}