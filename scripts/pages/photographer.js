//Mettre le code JavaScript lié à la page photographer.html




let sumLikes = 0
let mediasTrie = [];

// import { Lightbox } from "../utils/lightbox";


async function getData(id) {
  const jsonCall = await fetch('data/photographers.json');
  const data = await jsonCall.json();
  let photographer = [];
  let medias = [];
  data["photographers"].forEach(function (el) {
    if (el.id == id) {
      photographer = el;
    }
  })

  data["media"].forEach(function (el) {
    if (el.photographerId == id) {
      medias.push(el);
    }
  })

  return ({ photographer: photographer, medias: medias })
}




async function displayPhotographer(photographer) {
  const photoBio = document.querySelector(".photograph-bio");

  function photographerBio(photographer) {
    const bioModel = photographerFactory(photographer);
    const bioData = bioModel.getUserBioDOM();
    photoBio.appendChild(bioData);
  }
  return photographerBio(photographer);
}

async function displayMedia(medias) {
  const mediaContainer = document.querySelector(".divMedia");
  mediaContainer.innerHTML = "";
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaBio = mediaModel.getMediaDOM();
    mediaContainer.appendChild(mediaBio);
    sumLikes += media.likes;
    
  })
  likesUser();
  
  Lightbox.init()
};




// Date
function sortDate() {

  mediasTrie = mediasTrie.sort(function (mediaA, mediaB) {
    if (mediaA.date < mediaB.date) {
      return -1;
    }
    if (mediaA.date > mediaB.date) {
      return 1;
    }
  });
  

  displayMedia(mediasTrie)

}

// Popularité
function sortPopularity() {

  mediasTrie = mediasTrie.sort(function (mediaA, mediaB) {
    return mediaB.likes - mediaA.likes;
  });
  
  displayMedia(mediasTrie)

}

// Titre
function sortTitle() {

  mediasTrie = mediasTrie.sort(function (mediaA, mediaB) {
    if (mediaA.title < mediaB.title) {
      return -1;
    }
    if (mediaA.title > mediaB.title) {
      return 1;
    }
  });
  
  displayMedia(mediasTrie)

  
}

document.getElementById("sort_menu").addEventListener("change", sortPopularity)
document.getElementById("sort_menu").addEventListener("change", sortDate)
document.getElementById("sort_menu").addEventListener("change", sortTitle)


function likesUser() {
  
  const hearts = document.querySelectorAll(".fa-heart");
  hearts.forEach((heart) => {

    heart.addEventListener("click", functionLikes);

    function functionLikes(event) {

      if (Array.from(event.srcElement.classList).includes("fa-regular")) {

        event.srcElement.parentNode.children[0].textContent++
        document.querySelector("#totalLikes").textContent++
        event.srcElement.classList.remove("fa-regular");
        event.srcElement.classList.add("fa-solid");
      } else if (Array.from(event.srcElement.classList).includes("fa-solid")){

        event.srcElement.parentNode.children[0].textContent--
        document.querySelector("#totalLikes").textContent--
        event.srcElement.classList.remove("fa-solid");
        event.srcElement.classList.add("fa-regular");
        
        
      } 
    }
    
  })  
}

async function displayBottom(photographer) {
  const bottomBox = document.querySelector(".bottom-display");
  const likesCounter = document.createElement('span');

  let nbLikes = document.createElement("span")
  nbLikes.textContent = sumLikes;
  nbLikes.id = "totalLikes"
  likesCounter.appendChild(nbLikes) 
  let iFont = document.createElement("i")
  iFont.classList.add("fa-solid")
  iFont.classList.add("fa-heart")
  likesCounter.appendChild(iFont);

  const priceTag = document.createElement('span');
  priceTag.textContent = photographer.price + "€ / jour";
  bottomBox.appendChild(likesCounter)
  bottomBox.appendChild(priceTag);
}

async function init() {
  // Récupère les datas des photographes
  const str = window.location.href;
  const url = new URL(str);
  const idSelector = url.searchParams.get("id");
  let { photographer, medias } = await getData(idSelector);
  medias.forEach(media => mediasTrie.push(media));

  displayPhotographer(photographer);
  displayMedia(medias);
  displayBottom(photographer);
};

init();


//export function getData(id) 

