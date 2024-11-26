
function photographerTemplate(data) {
    const { name, portrait, id, city, price, tagline, country } = data;
    

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const pCityCountry = document.createElement('p');
        pCityCountry.innerHTML += `${city}, ${country} <br/>`;
        pCityCountry.className = "City_Country"

        const pTagline = document.createElement('p');
        pTagline.innerHTML += `${tagline} <br/>`;
        pTagline.className = "Tagline"

        const pPrice = document.createElement('p');
        pPrice.innerHTML += `${price}€/jour`;
        pPrice.className = "Price";
        

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCityCountry);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }
    return { name, picture, id, getUserCardDOM }
}

function PhotographePageHeader(data, urlId, section_info, section_portrait) {
    data.forEach(element => {
        if (urlId == element.id) {
        section_info.innerHTML += `<h1>${element.name}</h1> <br/><p class="City_Country">${element.city}, ${element.country}</p></br><p class="Tagline">${element.tagline}</p>`
        section_portrait.innerHTML += `<img src="assets/photographers/${element.portrait}" alt="${element.name}">`
        }
    });
}
function photographePageBody(data, urlId, section) {
    data.forEach(element => {
        const pathProjetImg = `assets/${urlId}/${element.image}`;
        const pathProjetHeartIcon = `assets/icons/heart.png`;
        const article = document.createElement('article');

        article.className= "projet-photograph";
        article.setAttribute('data-id', element.id);
        article.innerHTML += `<img src="${pathProjetImg}" class="photograph-projectImg"> <div class="info"><p id="heart-title">${element.title}</p><div class="heart"><p>${element.likes}</p><img class="heart-icon" src="${pathProjetHeartIcon}" alt="likes"></div></div>`; 
        
        article.addEventListener('click', () => {
            const test = article.getAttribute('data-id');
            console.log(test);
        })
        section.appendChild(article);

        
    });
}
