function mediaFactory(dataMedia) {
    const { name, id, photographerId, title, image,video, likes, date, price } = dataMedia;
    const vidSrc = `assets/${photographerId}/${video}`;
    const imgSrc = `assets/${photographerId}/${image}`;
    

    function getMediaDOM(){
        const div = document.createElement("div");
        div.classList.add("bloc-pic");
        let picImg = document.createElement ('img');
        let vidImg = document.createElement ('video');
        
        if(image){
            
            picImg.setAttribute("src", imgSrc);
            div.appendChild(picImg);
        }else{
            
            vidImg.setAttribute("src", vidSrc);
            vidImg.setAttribute("type", "video/mp4")
            vidImg.setAttribute("type", "video/mp4")
            div.appendChild(vidImg);
        }
        
        
        const h2Title = document.createElement('h2');
        h2Title.textContent = title;
        const hearts = document.createElement("p");
        hearts.textContent = likes;

        
        div.appendChild(h2Title);
        div.appendChild(hearts);

        return (div);
    }
    return {likes, getMediaDOM}
}