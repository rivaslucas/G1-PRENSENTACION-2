import { getProductsById } from "./services/products.app.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const detail = document.getElementById("detail");

if (id === null) {
  window.location.href = "/";
}

const products = getProductsById(id);

detail.innerHTML = getProductsData();

function getProductsData() {

    return `<div class="container-fluid detalle">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8 mt-5">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 col-lg-6 p-4 ubicacion">

              <!--carrusel-->
              <div id="carouselproducto" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselproducto" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselproducto" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="img-fluid" src="${products.picture}" class="d-block w-100"
                      alt="irresistible">
                  </div>
                  <div class="carousel-item">
                    <img class="img-fluid" src="${products.picture}" class="d-block w-100"
                      alt="irresistibleCaja">
                  </div>
                </div>
                <button class="carousel-control-prev text-black" type="button" data-bs-target="#carouselproducto"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon text-black" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselproducto"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <!--Fin carrusel-->
            </div>

            <div class="col-sm-12 col-lg-6">
              <article class="border border-light shadow rounded p-5">
                <h3 class="fuente ancore_simple">${products.name}</h3>
                <p class="card-text precio_grande">${products.price}</p><br><br>
                <p class="card-text">Distribuidor: ${products.distributor}</p>
                <p class="card-text">Cantidad: ${products.quantity}</p>
                <p class="card-text">Categoria: ${products.category}</p>
              </article>
            </div>

            <div class="col-12 p-4">
              <article>
                <h5 class="ancore_simple">DESCRIPCION</h5>
                <p class="justificado">${products.name}</p>
                <p class="justificado">${products.description}</p>
              </article>
            </div>

          </div>
        </div>

      </div>
    </div>
</div>`;
}
