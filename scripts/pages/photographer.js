//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    const jsonCall = await fetch('data/photographers.json');
    const photoArray = await jsonCall.json();


    return ({
        photographers: photoArray["photographers"]
    })
}

async function displayData(photographers) {
    const photographerHeader = document.querySelector(".photographer-bio");
    const str = window.location.href;
    const url = new URL(str);
    const idSelector = url.searchParams.get("id")

    photographers.forEach ((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userBio = photographerModel.getUserBioDOM();
        photographerHeader.appendChild();
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

