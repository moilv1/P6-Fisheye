
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
function createImageModal() {
    const modal = document.createElement("div");
    modal.id = "image-modal";
    modal.className = "modal";
    modal.style.display = "none";

    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = `X`

    const modalImg = document.createElement("img");
    modalImg.className = "modal-content";
    modalImg.id = "modal-image";

    const caption = document.createElement("div");  //1 div conteant img et caption
    caption.id = "caption";
    caption.append(modalImg)

    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    modal.appendChild(caption);

    document.body.appendChild(modal);
}

function photographePageBody(data, urlId, section) {
    // Crée la modal si elle n'existe pas déjà
    if (!document.getElementById("image-modal")) {
        createImageModal();
    }

    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const captionText = document.getElementById("caption");
    const closeBtn = modal.querySelector(".close");

    data.forEach(element => {
        const pathProjetMedia = `assets/${urlId}/${element.image}`;
        const pathProjetHeartIcon = `assets/icons/heart.png`;

        const article = document.createElement('article');
        article.className = "projet-photograph";
        article.setAttribute('data-id', element.id);

        article.innerHTML = `
            <img src="${pathProjetMedia}" alt="${element.title}" class="photograph-projectImg">
            <div class="info">
                <p id="heart-title">${element.title}</p>
                <div class="heart">
                    <p>${element.likes}</p>
                    <img class="heart-icon" src="${pathProjetHeartIcon}" alt="likes">
                </div>
            </div>
        `;

        // Ouvre la modal au clic
        article.querySelector('img').addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = pathProjetMedia;
            captionText.textContent = element.title;
        });

        section.appendChild(article);
    });

    // Ferme la modal au clic sur la croix
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Ferme si on clique à l'extérieur de l'image
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}
