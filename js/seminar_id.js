import { getSeminarById } from "./services/seminars.app.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const detail = document.getElementById("detail");

if (id === null) {
  window.location.href = "/";
}

const seminar = getSeminarById(id);

detail.innerHTML = getSeminarData();

function getSeminarData() {
  return `<div class="card mb-3">
    <img src="${seminar.picture}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${seminar.title}</h5>
      <p class="card-text">${seminar.description}</p>
      <p class="card-text"><small class="text-muted">${seminar.time}</small></p>
    </div>
  </div>`;
}
