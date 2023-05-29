
import hideLoadingMsg from '../modules/hideLoadingMsg.js'
import { refs }  from '../modules/refs.js'
import { fetchBreeds, fetchCatByBreed } from '../js/cat-api.js';

hideLoadingMsg();
refs.selector.classList.add('visually-hidden');
refs.errorMsg.classList.add("visually-hidden");

fetchBreeds();

refs.selector.addEventListener('change', () => {
    const breedId = refs.selector.value;
    fetchCatByBreed(breedId)
});

fetchCatByBreed();



        
           
            

