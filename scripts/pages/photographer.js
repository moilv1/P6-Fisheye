//Mettre le code JavaScript lié à la page photographer.html
let projetPhotographe = [];
let projectId;
const photoInfo = document.querySelector('.photograph-profile-info')
const photoInfoPortrait = document.querySelector('.photograph-profile-portrait')

// 1. Fonction pour extraire l'ID depuis l'URL
const pathImg = 'assets/images/${portrait}';

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); // "id" doit être le paramètre dans l'URL
}
function trieMedialistByIdPhotographe(data) {
    data.forEach(element => {
        if (element.photographerId == projectId) {
            projetPhotographe.push(element);
        }
    });
}






// récup le local storage
const mediaList = JSON.parse(localStorage.getItem('mediaList'));
const photographers = JSON.parse(localStorage.getItem('photographers'));





// Exécution
function init() {
    projectId = getIdFromUrl();
    trieMedialistByIdPhotographe(mediaList);
    PhotographePageHeader(photographers, projectId, photoInfo, photoInfoPortrait )
    
}
init()




