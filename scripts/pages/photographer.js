import { PhotographePageHeader, photographePageBody } from '../templates/photographer.js';

let projetPhotographe = [];
let projectId;

// Sélecteurs DOM
const photoInfo = document.querySelector('.photograph-profile-info');
const photoInfoPortrait = document.querySelector('.photograph-profile-portrait');
const photographBody = document.querySelector('.photograph-body');
const customSelect = document.querySelector('.custom-select');
const selected = customSelect.querySelector('.selected');
const options = customSelect.querySelector('.options');
const banner = document.querySelector('.photograph-banner');

// --- Récupération de l'ID depuis l'URL ---
export function getIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// --- Filtrer les médias pour ce photographe ---
function trieMedialistByIdPhotographe(data) {
  projetPhotographe = data.filter(element => element.photographerId == projectId);
}

// --- Trier les médias selon un critère ---
function sortMedia(mediaList, criteria) {
  const sorted = [...mediaList];

  switch(criteria) {
  case 'popularity':
    sorted.sort((a, b) => b.likes - a.likes);
    break;
  case 'date':
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    break;
  case 'title':
    sorted.sort((a, b) => a.title.localeCompare(b.title));
    break;
  }
  return sorted;
}

// --- Gestion du custom select ---
let currentValue = 'popularity'; // sélection par défaut

function updateOptionsList() {
  options.querySelectorAll('li').forEach(li => {
    li.style.display = li.dataset.value === currentValue ? 'none' : 'block';
  });
}

// Initialisation de la liste des options
updateOptionsList();

// Ouvrir / fermer le menu
selected.addEventListener('click', () => {
  const isOpen = options.style.display === 'block';
  options.style.display = isOpen ? 'none' : 'block';
  selected.querySelector('i').classList.toggle('fa-chevron-up');
  selected.querySelector('i').classList.toggle('fa-chevron-down');
});

// Sélection d’une option
options.querySelectorAll('li').forEach(option => {
  option.addEventListener('click', () => {
    // Réafficher l'ancienne option
    options.querySelector(`li[data-value="${currentValue}"]`).style.display = 'block';

    // Mettre à jour la sélection
    currentValue = option.dataset.value;
    selected.childNodes[0].textContent = option.textContent + ' ';

    // Masquer la nouvelle sélection
    option.style.display = 'none';

    // Fermer le menu et remettre la flèche
    options.style.display = 'none';
    selected.querySelector('i').classList.remove('fa-chevron-up');
    selected.querySelector('i').classList.add('fa-chevron-down');

    // Trier les médias en fonction de la sélection
    const sorted = sortMedia(projetPhotographe, currentValue);
    photographBody.innerHTML = '';
    photographePageBody(sorted, projectId, photographBody);
  });
});

// Fermer le menu si clic en dehors
document.addEventListener('click', (e) => {
  if (!customSelect.contains(e.target)) {
    options.style.display = 'none';
    selected.querySelector('i').classList.remove('fa-chevron-up');
    selected.querySelector('i').classList.add('fa-chevron-down');
  }
});

function displayTotalLikes(mediaList, projectId, photographers) {
  let totalLikes = 0;
  let price = 0;
  mediaList.forEach(element => {
    if (element.photographerId == projectId) {
      totalLikes += element.likes;
    }
  });
  photographers.forEach(element => {
    if (element.id == projectId) {
      price += element.price;
    }
  });
  
  // Créer ou mettre à jour un élément dans le banner pour afficher le total
  let likesElement = banner.querySelector('.total-likes');
  let priceElement = banner.querySelector('.price');
  
  if (!likesElement | !priceElement) {
    likesElement = document.createElement('div');
    likesElement.classList.add('total-likes');
    banner.appendChild(likesElement);

    priceElement = document.createElement('div');
    priceElement.classList.add('price');
    banner.appendChild(priceElement);
  }
  
  likesElement.innerHTML = `<span>${totalLikes}</span> <img class="banner_heart-icon" src="assets/icons/heart.png" alt="likes"></img>`;
  priceElement.innerHTML = `<span>${price}</span><p>€ / jour</p>`;
}

// --- Initialisation générale ---
function init() {
  projectId = getIdFromUrl();

  const mediaList = JSON.parse(localStorage.getItem('mediaList'));
  const photographers = JSON.parse(localStorage.getItem('photographers'));

  trieMedialistByIdPhotographe(mediaList);
  displayTotalLikes(mediaList, projectId, photographers);

  // Affiche header
  PhotographePageHeader(photographers, projectId, photoInfo, photoInfoPortrait);

  // Affiche les médias triés par Popularité par défaut
  const defaultSorted = sortMedia(projetPhotographe, 'popularity');
  photographePageBody(defaultSorted, projectId, photographBody);

}

init();
