const resultsContainer = document.querySelector('.js-results-container');
const paramContainer = document.querySelector('.js-search-param-container');
const akey = "0QQEgMaj5nwjvSc1mRmNaiaZtYnQjzCC";
let searchText = undefined;
let gifs = null;
let form = document.querySelector('.js-search-form');
let searchInput = document.querySelector('[name=search-name]');

async function loadGIFs() {
    if (gifs === null) {
        await fetchGIFs();
    } 
    displayGIFs();
}

function displayGIFs() {
    if (gifs === null) {
        return;
    }
    resultsContainer.innerHTML = gifs
        .map(gifs => renderGIFs(gifs))
        .join('');
}

function renderGIFs(gifs) {
    if ( gifs === null) {
        return;
    }
    img_item = gifs.images.fixed_height.url;
    return `
        <div class="gifs-item" data-id="${gifs.id}"> 
            <img
                src="${img_item}" 
                alt="GIF" />
            <p>${gifs.title}</p>
        </div>   
    `;       
}

async function fetchGIFs(searchText) {
    let giphy_arr = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${akey}&q=${searchText}&limit=10`);
    let response = await giphy_arr.json();
    gifs = response.data;
    loadGIFs(gifs);
}

function formSubmitted(event) {
    event.preventDefault();
    let searchText = (searchInput.value);
    fetchGIFs(searchText);
    searchInput.value = '';
}

form.addEventListener('submit', formSubmitted);
loadGIFs();