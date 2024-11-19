let currentPage = 1;
let loadingImages = false;

document.querySelector('button').addEventListener('click', async () => {

    // hämta söktext
    
    // hämta bilder
    let images = await getImages();
    
    // uppdatera ui
    updateUI(images);

});

async function getImages(){

    const apiKey = '2af54aca22ccb9c902078adc64b47907';
    let method = 'flickr.photos.search';
    let text = document.querySelector('input#text').value;
    const baseUrl = 'https://api.flickr.com/services/rest';

    let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&page=${currentPage}&format=json&nojsoncallback=1`;

    try {
        
        let resp = await fetch(url);
        let data = await resp.json();

        return await data;
        
    }

    catch(err) {
        console.error(err);
    }

}

function imgUrl(img, size){
    // vilken size?
    let imgSize = 'z';
    if(size == 'thumb') { imgSize = 'q' }
    if(size == 'large') { imgSize = 'b' }

    let url = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`

    return url;

}

function updateUI(data){
    loadingImages = false;

    let main = document.querySelector('main');

    data.photos.photo.forEach(img => {

        if(img.farm !== 0) {

            let el = document.createElement('img');
            el.setAttribute('src', imgUrl(img, 'thumb'));
            el.setAttribute('alt', img.title);

            el.addEventListener('click', () => {
                handleLightbox(img.title, imgUrl(img, 'large'));
            })
            
            main.appendChild(el);
        
        }
  
    });

}

// Open lightBox
function handleLightbox(title, url){

    document.querySelector('#overlay').classList.toggle('show');

    let el = document.querySelector('#overlay img');
        el.setAttribute('src', url);
        el.setAttribute('alt', title);

    document.querySelector('#overlay figcaption').innerHTML = title;

}

// Close lightBox
document.querySelector('#overlay').addEventListener('click', () => {
    document.querySelector('#overlay').classList.toggle('show');
})

window.onscroll = function() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.outerHeight;
    var height = d.offsetHeight;
  
    if (offset >= height) {
        console.log('At the bottom');

        if (!loadingImages) {
            loadingImages = true;
            currentPage++;
            nextPage();
        }
    }
  };

async function nextPage() {

    // hämta bilder
    let images = await getImages();

    // uppdatera ui
    updateUI(images);
}