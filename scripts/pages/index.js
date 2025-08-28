import { photographerTemplate } from '../templates/photographer.js';

export let photographers = [];
export let mediaList = [];

async function getPhotographers() {
  // Function to retrieve JSON data
  try {
    const response = await fetch('./data/photographers.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json(); // Convert the response to JSON
    return data; // Returns the data
        
  } catch (error) {
    console.error('There was a problem retrieving the data:', error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);


    // redirect to a photographer's page
    userCardDOM.addEventListener('click', () => {
      window.location.href = `photographer.html?id=${photographerModel.id}`;
    });
  });
}

async function init() {
  const {photographers, media}= await getPhotographers();

  // Stock dans localStorage
  localStorage.setItem('mediaList', JSON.stringify(media));
  localStorage.setItem('photographers', JSON.stringify(photographers));

  displayData(photographers);
}
init();