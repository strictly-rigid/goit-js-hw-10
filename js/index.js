
import hideLoadingMsg from '../modules/hideLoadingMsg.js'
import { refs }  from '../modules/refs.js'
import { fetchBreeds, fetchCatByBreed } from '../js/cat-api.js';

hideLoadingMsg();
refs.selector.classList.add('visually-hidden');
refs.errorMsg.classList.add("visually-hidden");

fetchBreeds()
    .then(data => {     
        hideLoadingMsg(); 
      
        refs.selector.classList.remove('visually-hidden');
        refs.errorMsg.classList.add('visually-hidden');
        
        data.forEach(breed => {
        const catBreed = document.createElement('option');
        catBreed.value = breed.id;
        catBreed.textContent = breed.name;
        refs.selector.appendChild(catBreed);
        
    });
    })
    .catch(error => { 
        hideLoadingMsg();
        refs.errorMsg.classList.remove("visually-hidden");
        console.error('Error:', error.name, error.message);
    });

refs.selector.addEventListener('change', () => {
    const breedId = refs.selector.value;
    fetchCatByBreed(breedId)
        .then(breedData => {
            if (breedData) {
                console.log(breedData);
            let breedImg = document.createElement('img');
                    breedImg.src = breedData.url;
                    breedImg.style.maxWidth = "320px"
            let breedName = document.createElement('h3');
                    breedName.textContent = breedData.breeds[0].name;
            let breedDescr = document.createElement('p');
                    breedDescr.textContent = breedData.breeds[0].description;
            let breedTemper = document.createElement('p');
                    breedTemper.innerHTML = '<b>Temperament: </b>' + breedData.breeds[0].temperament;
            refs.infoArea.innerHTML = '';
                    refs.infoArea.append(breedImg, breedName, breedDescr, breedTemper);
             }
        })
    
});





        
           
            

