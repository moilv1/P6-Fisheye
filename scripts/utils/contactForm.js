import { getIdFromUrl } from '../pages/photographer.js';

const modal = document.getElementById('contact_modal');
const main = document.querySelector('main');
const html = document.querySelector('html');
const photographInfo = document.querySelector('.contact_photograph-info');
let idUrl = getIdFromUrl();
const contactButton = document.getElementById('contactButton');
const closeButton = document.getElementById('closeButton');
const sendButton = document.getElementById('sendButton');

let photographers = JSON.parse(localStorage.getItem('photographers'));

function displayModal() {
  modal.style.display = 'block';
  main.style.opacity = '0.5';
  html.style.overflow = 'hidden';
  getNameByID(idUrl, photographers);
}
function closeModal() {
  modal.style.display = 'none';
  main.style.opacity = '1';
  html.style.overflow = 'visible';
}
function submitModal() {
  window.location.href = `photographer.html?id=${idUrl}`;
  closeModal();
}

function getNameByID(id, data) {
  const element = data.find(item => item.id == id);
  if (element) {
    photographInfo.innerHTML = `<h2>${element.name}</h2>`;
  }
}

contactButton.addEventListener('click', displayModal);
closeButton.addEventListener('click', closeModal);
sendButton.addEventListener('click', (event) => {
  event.preventDefault();
  submitModal();
} );

