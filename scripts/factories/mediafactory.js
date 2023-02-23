function mediaFactory(dataMedia) {
    const { name, id, photographerId, title, image,video, likes, date, price } = dataMedia;
    const vidSrc = `assets/${photographerId}/${video}`;
    const imgSrc = `assets/${photographerId}/${image}`;
    

    function getMediaDOM(){
        const a = document.createElement("a");
        a.classList.add("bloc-pic");
        if(image){
            a.setAttribute("href", imgSrc);
            let picImg = document.createElement ('img');
            picImg.setAttribute("src", imgSrc);
            a.appendChild(picImg);
        }else{
            a.setAttribute("href", vidSrc);
            let vidImg = document.createElement ('video');
            vidImg.setAttribute("src", vidSrc);
            
            vidImg.setAttribute("type", "video/mp4")
            vidImg.setAttribute("type", "video/mp4")
            a.appendChild(vidImg);
        }
        const h2Title = document.createElement('h2');
        h2Title.textContent = title;
        const hearts = document.createElement("p");
        hearts.textContent = likes;
        hearts.innerHTML = likes + " " + "<i class=\"fa-solid fa-heart\"></i>"

        const span = document.createElement("span");
        span.classList.add("span-pic");
        a.appendChild(span);
        span.appendChild(h2Title);
        span.appendChild(hearts);

        return (a);
    }
    return {likes, getMediaDOM}
}