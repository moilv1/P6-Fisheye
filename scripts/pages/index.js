    async function getPhotographers() {
        // Fonction pour récupérer les données JSON
        try {
            const response = await fetch('./data/photographers.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json(); // Convertir la réponse en JSON
            return data; // Retourne les données
            
            
        } catch (error) {
            console.error('Il y a eu un problème avec la récupération des données:', error);
        }
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    init();
    
