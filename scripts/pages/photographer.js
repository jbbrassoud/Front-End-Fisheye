//Mettre le code JavaScript lié à la page photographer.html

let sumLikes = 0
let mediasTrie = [];



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

function likesUser() {
  let totalLikes = 0;
  const hearts = document.querySelectorAll(".fa-heart");
  hearts.forEach((heart) => {

    heart.addEventListener("click", functionLikes);

    function functionLikes(event) {
      console.log(event.srcElement.classList)
      let valueLike = event.previousElementSibling.innerHTML;
      console.log(valueLike)


      if (valueLike.class === document.querySelector(".fa-regular")) {
        valueLike++;
        totalLikes.innerHTML++;
        event.previousElementSibling.innerHTML = valueLike.toString();
        valueLike.classList.remove("fa-regular");
        valueLike.classList.add("fa-solid");
      } else if (valueLike === document.querySelector(".fa-solid")) {
        valueLike--;
        totalLikes.innerHTML--;
        valueLike.classList.remove("fa-solid");
        valueLike.classList.add("fa-regular");
        event.previousElementSibling.innerHTML = valueLike.toString();
        
      }
      return functionLikes();

      /*
      if (valueLike === Number(tabValueOfAllsLikes[index])) {
        valueLike++;
        totalLikes.innerHTML++;
        event.previousElementSibling.innerHTML = valueLike.toString();
      } else if (valueLike === Number(tabValueOfAllsLikes[index]) + 1) {
        valueLike--;
        totalLikes.innerHTML--;
        event.previousElementSibling.innerHTML = valueLike.toString();
      }
      return functionLikes();
      */
    }
  });

}

async function displayBottom(photographer) {
  const bottomBox = document.querySelector(".bottom-display");
  const likesCounter = document.createElement('span');

  likesCounter.textContent = sumLikes;
  likesCounter.innerHTML = sumLikes + " " + "<i class=\"fa-solid fa-heart\"></i>" + " ";


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
  likesUser();
  displayBottom(photographer);
};

init();

//export function getData(id) 

