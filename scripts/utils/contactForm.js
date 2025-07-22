const modal = document.getElementById("contact_modal");
const main = document.querySelector("main");
const html = document.querySelector("html");
const photographInfo = document.querySelector(".photograph-info");
let idUrl

function displayModal() {
	modal.style.display = "block";
    main.style.opacity = "0";
    html.style.overflow = "hidden";
    idUrl = getIdFromUrl()
    getNameByID(idUrl, photographers)
}
function closeModal() {
    modal.style.display = "none";
    main.style.opacity = "1";
    html.style.overflow = "visible";
}
function submitModal() {
    window.location.href = `photographer.html?id=${idUrl}`;
}

function getNameByID(id, data) {
    const element = data.find(item => item.id == id)
    if (element) {
        photographInfo.innerHTML = `<h2>${element.name}</h2>`
    }
}
