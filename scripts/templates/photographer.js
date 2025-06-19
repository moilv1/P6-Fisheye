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
        pTagline.innerHTML = `${tagline} <br/>`;
        pTagline.className = "Tagline";

        const pPrice = document.createElement('p');
        pPrice.innerHTML = `${price}€/jour`;
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
            section_info.innerHTML += `
                <h1>${element.name}</h1>
                <br/>
                <p class="City_Country">${element.city}, ${element.country}</p>
                </br>
                <p class="Tagline">${element.tagline}</p>
            `;
            section_portrait.innerHTML += `<img src="assets/photographers/${element.portrait}" alt="${element.name}">`;
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
    prevBtn.textContent = "<";

    const nextBtn = document.createElement("span");
    nextBtn.className = "nav next";
    nextBtn.textContent = ">";

    const mediaContainer = document.createElement("div");
    mediaContainer.id = "modal-media";

    const caption = document.createElement("span");
    caption.id = "caption";

    mediaContainer.appendChild(caption);

    modal.append(closeBtn, prevBtn, mediaContainer, nextBtn);
    document.body.appendChild(modal);
}

function photographePageBody(data, urlId, section) {
    if (!document.getElementById("image-modal")) {
        createImageModal();
    }

    const modal = document.getElementById("image-modal");
    const mediaContainer = document.getElementById("modal-media");
    const captionText = document.getElementById("caption");
    const closeBtn = modal.querySelector(".close");
    const prevBtn = modal.querySelector(".prev");
    const nextBtn = modal.querySelector(".next");

    let currentIndex = 0;
    const mediaItems = [];

    data.forEach((element, index) => {
        const isVideo = element.video !== undefined && element.video !== "";
        const mediaFile = isVideo ? element.video : element.image;
        const mediaType = isVideo ? "video" : "image";
        const pathProjetMedia = `assets/${urlId}/${mediaFile}`;
        const pathProjetHeartIcon = `assets/icons/heart.png`;

        mediaItems.push({ src: pathProjetMedia, title: element.title, type: mediaType });

        const article = document.createElement('article');
        article.className = "projet-photograph";
        article.setAttribute('data-id', element.id);

        const mediaHTML = isVideo
            ? `<video class="photograph-projectVideo" controls>
                   <source src="${pathProjetMedia}" type="video/mp4">
                   Votre navigateur ne peut pas lire cette vidéo.
               </video>`
            : `<img src="${pathProjetMedia}" alt="${element.title}" class="photograph-projectImg">`;

        article.innerHTML = `
            ${mediaHTML}
            <div class="info">
                <p id="heart-title">${element.title}</p>
                <div class="heart">
                    <p>${element.likes}</p>
                    <img class="heart-icon" src="${pathProjetHeartIcon}" alt="likes">
                </div>
            </div>
        `;

        const mediaElement = article.querySelector('img, video');
        mediaElement.addEventListener('click', () => {
            currentIndex = index;
            showModalMedia();
        });

        section.appendChild(article);
    });

    function showModalMedia() {
        modal.style.display = "flex";
        const currentMedia = mediaItems[currentIndex];

        Array.from(mediaContainer.children).forEach(child => {
            if (child.id !== "caption") {
                mediaContainer.removeChild(child);
            }
        });

        let mediaElement;
        if (currentMedia.type === "image") {
            mediaElement = document.createElement("img");
            mediaElement.src = currentMedia.src;
            mediaElement.alt = currentMedia.title;
        } else {
            mediaElement = document.createElement("video");
            mediaElement.controls = true;
            mediaElement.autoplay = false;

            const source = document.createElement("source");
            source.src = currentMedia.src;
            source.type = "video/mp4";
            mediaElement.appendChild(source);
        }

        mediaElement.className = "modal-content";

        // Insérer avant la légende dans le même conteneur
        mediaContainer.insertBefore(mediaElement, captionText);
        captionText.textContent = currentMedia.title;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        showModalMedia();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        showModalMedia();
    }

    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    closeBtn.addEventListener('click', () => modal.style.display = "none");

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}
