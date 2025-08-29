import { PhotographePageHeader, photographePageBody } from '../templates/photographer.js';

let projetPhotographe = [];
let projectId;

// DOM selectors
const photoInfo = document.querySelector('.photograph-profile-info');
const photoInfoPortrait = document.querySelector('.photograph-profile-portrait');
const photographBody = document.querySelector('.photograph-body');
const customSelect = document.querySelector('.custom-select');
const selected = customSelect.querySelector('.selected');
const options = customSelect.querySelector('.options');
const banner = document.querySelector('.photograph-banner');

// --- Retrieving the ID from the URL ---
export function getIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// --- Filter media for this photographer ---
function trieMedialistByIdPhotographe(data) {
  projetPhotographe = data.filter(element => element.photographerId == projectId);
}

// --- Sort media by a criterion ---
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

// --- Custom selection management ---
let currentValue = 'popularity'; // --- default selection ---

function updateOptionsList() {
  options.querySelectorAll('li').forEach(li => {
    li.style.display = li.dataset.value === currentValue ? 'none' : 'block';
  });
}

// --- Initializing the list of options ---
updateOptionsList();

// --- Open/close the menu ---
selected.addEventListener('click', () => {
  const isOpen = options.style.display === 'block';
  options.style.display = isOpen ? 'none' : 'block';
  selected.querySelector('i').classList.toggle('fa-chevron-up');
  selected.querySelector('i').classList.toggle('fa-chevron-down');
});

// --- Selecting an option ---
options.querySelectorAll('li').forEach(option => {
  option.addEventListener('click', () => {
    // Redisplay the old option
    options.querySelector(`li[data-value="${currentValue}"]`).style.display = 'block';

    // Update selection
    currentValue = option.dataset.value;
    selected.childNodes[0].textContent = option.textContent + ' ';

    // Hide the new selection
    option.style.display = 'none';

    // Close the menu and return the arrow
    options.style.display = 'none';
    selected.querySelector('i').classList.remove('fa-chevron-up');
    selected.querySelector('i').classList.add('fa-chevron-down');

    // Sort media based on selection
    const sorted = sortMedia(projetPhotographe, currentValue);
    photographBody.innerHTML = '';
    photographePageBody(sorted, projectId, photographBody);
  });
});

// Close the menu if you click outside it
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
  
  // Create or update an item in the banner to display the total
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

  // Header
  PhotographePageHeader(photographers, projectId, photoInfo, photoInfoPortrait);

  // Displays media sorted by Popularity by default
  const defaultSorted = sortMedia(projetPhotographe, 'popularity');
  photographePageBody(defaultSorted, projectId, photographBody);

}

init();
