function mediaFactory(dataMedia) {
    const { name, id, photographerId, title, image, video, likes, date, price } = dataMedia;
    const vidSrc = `assets/${photographerId}/${video}`;
    const imgSrc = `assets/${photographerId}/${image}`;


    function getMediaDOM() {
        const div = document.createElement("div");
        const a = document.createElement("a");
        div.classList.add("bloc-pic");
        if (image) {
            a.setAttribute("href", imgSrc);
            let picImg = document.createElement('img');
            picImg.setAttribute("src", imgSrc);
            const altImg = title;
            picImg.setAttribute("alt", altImg);
            a.appendChild(picImg);
        } else {
            a.setAttribute("href", vidSrc);
            let vidImg = document.createElement('video');
            let vidSource = document.createElement('source');
            vidSource.setAttribute("src", vidSrc)
            vidSource.setAttribute("type", "video/mp4")
            a.appendChild(vidImg)
            vidImg.appendChild(vidSource);
            
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
        div.appendChild(a)
        div.appendChild(span)
        span.appendChild(h2Title);
        span.appendChild(hearts);

        return (div)
    }
    return { likes, getMediaDOM }
}
