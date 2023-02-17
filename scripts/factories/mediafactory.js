function mediaFactory(dataMedia) {
    const { name, id, photographerId, title, image, likes, date, price } = dataMedia;
    const imgSrc = `assets/${photographerId}/${image}`;

    function getMediaDOM(){
        const div = document.createElement("div");
        div.classList.add("bloc-pic");
        let picImg = document.createElement ('img');
        picImg.setAttribute("src", imgSrc);
        const h2Title = document.createElement('h2');
        h2Title.textContent = title;
        const hearts = document.createElement("p");
        hearts.textContent = likes;
        div.appendChild(picImg);
        div.appendChild(h2Title);
        div.appendChild(hearts);

        return (div);
    }
    return {likes, getMediaDOM}
}