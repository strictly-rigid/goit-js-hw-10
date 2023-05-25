
const refs = {
    selector: document.querySelector('.breed-select'),
    loadingMsg: document.querySelector('.loader'),
    errorMsg: document.querySelector('.error'),
    infoArea: document.querySelector('.cat-info')
}

const API_KEY = 'live_ag5gUMuzkKy1xkRlgH6wDth7ng0wrLjfzgajka7bj4vCf5eioDJ3pQ1w343mAjzM';



fetch("https://api.thecatapi.com/v1/breeds")
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status);
        }
       
        return response.json();
    })
    .then(data => {     
        refs.loadingMsg.classList.add("visually-hidden");
        refs.errorMsg.classList.add("visually-hidden");
        data.forEach(breed => {
        const catBreed = document.createElement('option');
        catBreed.value = breed.id;
        catBreed.textContent = breed.name;
        refs.selector.appendChild(catBreed);
    });
    })
    .catch(error => {           
        refs.errorMsg.classList.remove("visually-hidden");
        console.error('Error:', error.name, error.message);
    });

refs.selector.addEventListener('change', () => {
    const breedId = refs.selector.value;
    fetchCatByBreed(breedId)
});

function fetchCatByBreed(breedId) {
    
    fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(
        response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            
            const breedData = data[0];
            let breedImg = document.createElement('img');
            breedImg.src = breedData.url;
            let breedName = document.createElement('h3');
            breedName.textContent = breedData.breeds[0].name;
            let breedDescr = document.createElement('p');
            breedDescr.textContent = breedData.description;
            let breedTemper = document.createElement('p');
            breedTemper.textContent = breedData.breeds[0].temperament;
            refs.infoArea.innerHTML = '';
            refs.infoArea.append(breedImg, breedName, breedDescr, breedTemper)
        })
        .catch(error => {
            console.error('Error:', error.name, error.message);
        })
}

        
           
            

