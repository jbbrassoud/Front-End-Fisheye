function mediaFactory(dataMedia) {
    const { name, id, photographerId, title, image, video, likes, date, price } = dataMedia;
    const vidSrc = `assets/${photographerId}/${video}`;
    const imgSrc = `assets/${photographerId}/${image}`;


    function getMediaDOM() {
        const div = document.createElement("div");
        div.classList.add("bloc-pic");
        if (image) {
            const picture = document.createElement('img');
            picture.setAttribute("src", imgSrc);
            const altImg = title;
            picture.setAttribute("alt", altImg);
            picture.setAttribute("alt", altImg);
            div.appendChild(picture)

        } else {
            const picture = document.createElement('video');
            let vidSource = document.createElement('source');
            vidSource.setAttribute("src", vidSrc)
            vidSource.setAttribute("type", "video/mp4")
            const altImg = "photo of " + title;


            div.appendChild(picture)
            picture.appendChild(vidSource);
            picture.setAttribute("alt", altImg);

        }
        const h2Title = document.createElement('h2');
        h2Title.textContent = title;
        const hearts = document.createElement("p");
        hearts.classList.add("value-like");
        let nbLikes = document.createElement("span")
        
        nbLikes.textContent = likes;
        
        hearts.appendChild(nbLikes) 
        let iFont = document.createElement("i")
        iFont.classList.add("fa-regular")
        iFont.classList.add("fa-heart")
        hearts.appendChild(iFont);
        const span = document.createElement("span");
        span.classList.add("span-pic");
        div.appendChild(span)
        span.appendChild(h2Title);
        span.appendChild(hearts);
        hearts.setAttribute("role", "link")
        div.setAttribute("role", "link")
        return (div)
    }
    return { likes, getMediaDOM }
}
