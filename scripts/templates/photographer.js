
function photographerTemplate(data) {
    const { name, portrait, id, city, price, tagline, country } = data;
    console.log(id);
    

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
    return { name, picture, getUserCardDOM }
}