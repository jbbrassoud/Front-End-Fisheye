//Mettre le code JavaScript lié à la page photographer.html

let sumLikes = 0

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

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaBio = mediaModel.getMediaDOM();
    mediaContainer.appendChild(mediaBio);
    sumLikes += media.likes;
  })
};

// Date
function sortDate(medias) {
  return medias.sort(function (mediaA, mediaB) {
    if (mediaA.date < mediaB.date) {
      return -1;
    }
    if (mediaA.date > mediaB.date) {
      return 1;
    }
  });
}

// Popularité
function sortPopularity(medias) {
  return medias.sort(function (mediaA, mediaB) {
    return mediaA.likes - mediaB.likes;
  });
}

// Titre
function sortTitle(medias) {
  return medias.sort(function (mediaA, mediaB) {
    if (mediaA.title < mediaB.title) {
      return -1;
    }
    if (mediaA.title > mediaB.title) {
      return 1;
    }
  });
}

function likesUser() {
  let totalLikes = 0;
  hearts = document.querySelectorAll(".fa-heart");
  hearts.forEach((heart) => {

    heart.addEventListener("click", functionLikes);

    function functionLikes(event) {
      console.log(event)
      let valueLike = parseInt(event.previousElementSibling.innerHTML);

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
    }
  });

}

async function displayBottom(photographer) {
  const bottomBox = document.querySelector(".bottom-display");
  const likesCounter = document.createElement('span');

  likesCounter.textContent = sumLikes;
  
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


  displayPhotographer(photographer);
  displayMedia(medias);
  likesUser();
  displayBottom(photographer);
};

init();

