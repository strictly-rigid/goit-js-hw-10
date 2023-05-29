import showLoadingMsg from '../modules/showLoadingMsg.js';
import hideLoadingMsg from '../modules/hideLoadingMsg.js';
import { refs }  from '../modules/refs.js'

const API_KEY = 'live_ag5gUMuzkKy1xkRlgH6wDth7ng0wrLjfzgajka7bj4vCf5eioDJ3pQ1w343mAjzM';

export function fetchBreeds() {
    
fetch("https://api.thecatapi.com/v1/breeds")
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status);
        }
       
        return response.json();
    })
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
}


export function fetchCatByBreed(breedId) {
    showLoadingMsg();
    fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(
        response => {
            
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
                if (data && data.length > 0) {
            hideLoadingMsg();
            const breedData = data[0];
            console.log(breedData);
            let breedImg = document.createElement('img');
                    breedImg.src = breedData.url;
                    breedImg.style.maxWidth = "320px"
            let breedName = document.createElement('h3');
                    breedName.textContent = breedData.breeds[0].name;
            let breedDescr = document.createElement('p');
                    breedDescr.textContent = breedData.description;
            let breedTemper = document.createElement('p');
                    breedTemper.textContent = breedData.breeds[0].temperament;
            refs.infoArea.innerHTML = '';
            refs.infoArea.append(breedImg, breedName, breedDescr, breedTemper);}
       
            

            
        })
        .catch(error => {
            hideLoadingMsg();
            refs.errorMsg.classList.remove("visually-hidden");
            console.error('Error:', error.name, error.message);
        })
}



