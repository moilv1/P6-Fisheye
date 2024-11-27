const modal = document.getElementById("contact_modal");
const main = document.querySelector("main");
const html = document.querySelector("html")
function displayModal() {
	modal.style.display = "block";
    main.style.opacity = "0.5";
    html.style.overflow = "hidden";
}
function closeModal() {
    modal.style.display = "none";
    main.style.opacity = "1";
    html.style.overflow = "visible";
}
function submitModal() {
    window.location.href = `photographer.html?id=${photographerModel.id}`;
}
