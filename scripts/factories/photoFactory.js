function photographerFactory(dataArtist) {
    const { id, name, portrait, city, country, tagline, price, likes } = dataArtist;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const linkId = document.createElement ('a');
        linkId.title = "Page de " + name;  
        linkId.href = "photographer.html?id=" + id;
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const p1 = document.createElement ('p');
        p1.textContent = city + ', ' + country;
        p1.classList.add('p1');
        const p2 = document.createElement ('p');
        p2.textContent = tagline;
        p2.classList.add('p2');
        const p3 = document.createElement ('p');
        p3.textContent = price + "€/jour";
        p3.classList.add('p3');

        article.appendChild(linkId); 
        linkId.appendChild(img);
        linkId.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);

        return (article);
    }
    
    function getUserBioDOM(){
        const article = document.createElement( 'article' );
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p1 = document.createElement ('p');
        p1.textContent = city + ', ' + country;
        p1.classList.add('p01');
        const p2 = document.createElement ('p');
        p2.textContent = tagline;
        p2.classList.add('p02');
        const img = document.querySelector( '.bioPic' );
        img.setAttribute("src", picture)
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);

        return (article);
    }

    function displayBottomDOM() {
        const span = document.createElement('span');
        const likesCounter = document.createElement('p');
        const array = [likes];
        let sumLikes = 0;

        for (let i = 0; i < array.length; i++) {
        sumLikes += array[i];
        }

        likesCounter.textContent = sumLikes;
        console.log(sumLikes);


        


        const priceTag = document.createElement('p');
        priceTag.textContent = price + "€ / jour";
        span.appendChild(likesCounter)
        span.appendChild(priceTag);
        

        return (span)
    }




    return { name, picture, id, price, getUserCardDOM, getUserBioDOM, displayBottomDOM}
}

