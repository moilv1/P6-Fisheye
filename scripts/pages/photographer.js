import { PhotographePageHeader, photographePageBody } from '../templates/photographer.js';


let projetPhotographe = [];
let projectId;

const photoInfo = document.querySelector('.photograph-profile-info');
const photoInfoPortrait = document.querySelector('.photograph-profile-portrait');
const photographBody = document.querySelector('.photograph-body');



export function getIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
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
  PhotographePageHeader(photographers, projectId, photoInfo, photoInfoPortrait);
  photographePageBody(projetPhotographe, projectId, photographBody);
}
init();




