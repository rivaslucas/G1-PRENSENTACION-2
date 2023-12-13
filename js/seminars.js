import { getSeminars } from "./services/seminars.app.js";

const seminars = getSeminars();
const divContainer = document.getElementById("card-container");

{
  /*  */
}

if (seminars) {
  console.log(seminars);
  refresh();
}

function refresh() {
  let htmlString = "";
  divContainer.innerHtml = "";

  seminars.forEach((seminar) => {
    htmlString += getHtmlCard(
      seminar.picture,
      seminar.title,
      seminar.description,
      seminar.id
    );
  });

  divContainer.innerHTML = htmlString;
}

function getHtmlCard(picture, title, description, id) {
  return `<div class="card" style="width: 18rem;">
  <img src="${picture}" class="card-img-top" alt="no-image">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
    <a href="./seminar_id.html?id=${id}" class="btn btn-dark">Detalle</a>
  </div>
</div>`;
}
