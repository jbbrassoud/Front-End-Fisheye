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
        if(el.photographerId == id){
            medias.push(el);
        }
    })
    
    return ({photographer: photographer, medias: medias})
}

async function displayPhotographer(photographer) {
    const photoBio = document.querySelector(".photograph-bio");
    
    function photographerBio (photographer) {
        const bioModel = photographerFactory(photographer);
        const bioData = bioModel.getUserBioDOM();
        photoBio.appendChild(bioData);
    }
    return photographerBio(photographer);
}


async function displayMedia(medias) {
    const mediaContainer = document.querySelector(".divMedia");
    
    medias.forEach ((media) => {
        const mediaModel = mediaFactory(media);
        const mediaBio = mediaModel.getMediaDOM();
        mediaContainer.appendChild(mediaBio);
        
    }) 
};

async function displayBottom(photographer) {
    const bottomBox = document.querySelector(".bottom-display");
    
    function bottomBio (photographer) {
        const bottomModel = photographerFactory(photographer);
        const bottomData = bottomModel.displayBottomDOM();
        bottomBox.appendChild(bottomData);
        
    }
    return bottomBio(photographer);
}

/*
async function displayBottom(likes) {
    const bottomBox = document.querySelector("bottomBox");
    let {photographer, medias} = await getData(likes);
    var sum = 0;
    for (var i = 0; i < likes.value; i++) {
    sum += photographer[likes];
    }     
}   
*/


async function init() {
    // Récupère les datas des photographes
    const str = window.location.href;
    const url = new URL(str);
    const idSelector = url.searchParams.get("id");
    let {photographer, medias} = await getData(idSelector);
    

    displayPhotographer(photographer);
    displayMedia(medias);

    displayBottom(photographer);
};

init();

