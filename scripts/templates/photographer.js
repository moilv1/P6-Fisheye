function photographerTemplate(data) {
    const { name, portrait, id, city, price, tagline, country } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const pCityCountry = document.createElement('p');
        pCityCountry.innerHTML = `${city}, ${country}<br/>`;
        pCityCountry.className = "City_Country";

        const pTagline = document.createElement('p');
        pTagline.innerHTML += `${tagline} <br/>`;
        pTagline.className = "Tagline";

        const pPrice = document.createElement('p');
        pPrice.innerHTML += `${price}€/jour`;
        pPrice.className = "Price";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCityCountry);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return article;
    }
    
    return { name, picture, id, getUserCardDOM };
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
    closeBtn.textContent = "X";

    const prevBtn = document.createElement("span");
    prevBtn.className = "nav prev";
    prevBtn.textContent = "←";

    const nextBtn = document.createElement("span");
    nextBtn.className = "nav next";
    nextBtn.textContent = "→";

    const modalImg = document.createElement("img");
    modalImg.className = "modal-content";
    modalImg.id = "modal-image";

    const caption = document.createElement("div");
    caption.id = "caption";

    modal.append(closeBtn, prevBtn, modalImg, nextBtn, caption);
    document.body.appendChild(modal);
}

function photographePageBody(data, urlId, section) {
    if (!document.getElementById("image-modal")) {
        createImageModal();
    }

    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const captionText = document.getElementById("caption");
    const closeBtn = modal.querySelector(".close");
    const prevBtn = modal.querySelector(".prev");
    const nextBtn = modal.querySelector(".next");

    let currentIndex = 0;
    const mediaItems = [];

    data.forEach((element, index) => {
        const pathProjetMedia = `assets/${urlId}/${element.image}`;
        const pathProjetHeartIcon = `assets/icons/heart.png`;

        mediaItems.push({ src: pathProjetMedia, title: element.title });

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

        article.querySelector('img').addEventListener('click', () => {
            currentIndex = index;
            showModalImage();
        });

        section.appendChild(article);
    });

    function showModalImage() {
        modal.style.display = "flex";
        modalImg.src = mediaItems[currentIndex].src;
        captionText.textContent = mediaItems[currentIndex].title;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        showModalImage();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        showModalImage();
    }

    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    closeBtn.addEventListener('click', () => modal.style.display = "none");

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    window.addEventListener('keydown', (e) => {
        if (modal.style.display === "block") {
            if (e.key === "ArrowRight") showNextImage();
            if (e.key === "ArrowLeft") showPrevImage();
            if (e.key === "Escape") modal.style.display = "none";
        }
    });
}
