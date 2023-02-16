//Mettre le code JavaScript lié à la page photographer.html
async function getData(id) {
    const jsonCall = await fetch('data/photographers.json');
    const data = await jsonCall.json();
    let photographer = [];
    let medias = [];

    

    data["photographers"].forEach( function (el){
        if(el.id == id){
            photographer = el;
        }
    })

    data["media"].forEach(function (el){
        if(el.idPhotographer == id){
            medias.push(el);
        }
    })
    
    return ({photographer: photographer, medias: medias})
}

async function displayPhotographer(photographer) {
    const photoBio = document.querySelector(".photographer-bio");
    
    function photographerBio (photographer) {
        const bioModel = photographerFactory(photographer);
        const bioData = bioModel.getUserBioDom();
        photoBio.appendChild(bioData);
    }
    return photographerBio();
};

async function displayMedia(medias) {
    const mediaContainer = document.querySelector(".divMedia");
    
    medias.forEach ((media) => {
        const mediaModel = mediaFactory(media);
        const mediaBio = mediaModel.getMediaDom();
        mediaContainer.appendChild(mediaBio);
    })
};

async function init() {
    // Récupère les datas des photographes
    const str = window.location.href;
    const url = new URL(str);
    const idSelector = url.searchParams.get("id");
    const {photographer, medias} = await getData(idSelector);
    
    displayPhotographer(photographer);
    displayMedia(medias);
};

init();

