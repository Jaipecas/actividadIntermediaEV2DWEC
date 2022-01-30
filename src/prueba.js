/*  import fetch from 'node-fetch';


 async function fetchReq(param) {
     const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${param}`);
     const data = await res.json();
     return data.title;
 }


 async function ppp() {
     let arrayfetch = ['1', '2', '3'];
     let results = [];

     arrayfetch.forEach(async element => {
         let result = await fetchReq(element);    
         results.push(result); 
     })
 }

 ppp(); */





//PRUEBA 2

/* return searchCharacter(nameCharacther)
        .then((character) => {
            return character.episode
        })
        .then((episodes) => {
            //lanzamos fetch
            let arrayPromises = [];
            episodes.forEach(httpEpisode => {
                arrayPromises.push(searcCharactersEpisodes(httpEpisode));
            });
            return arrayPromises;
        })
        .then((arrayPromises) => {
            let arrayPromisesCharacter = [];
            arrayPromises.forEach(promise => {
                promise
                    .then((data) => {
                        let characters = data.characters
                        characters.forEach(httpCharacterId => {
                            arrayPromisesCharacter.push(searcCharactersById(httpCharacterId));
                        });
                    })
            });
            
            let all = Promise.all(arrayPromisesCharacter);
            console.log(all)
        })

 */

/*  console.log(await p()); */