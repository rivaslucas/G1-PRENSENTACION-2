
import {
  deleteProduct,
    getProductById,
 
    getProducts,
  } from "./services/products.app.js";
  import { GetItem } from "./services/local-storage.app.js";
  import { LOCAL_STORAGE_KEYS } from "./configurations/keys.config.js";
  import { ROLES_VALUES,INITIAL_ROLES } from "./configurations/seed.js";


  const productsTable = document.getElementById("products-table");
  const deleteProductBtn = document.getElementById("deleteProduct");    
  let data = {
    users: [],
    products: [],
  };

  let currents = {
    product: {},
    user: {},
  };

  refresh(refreshProducts);
function refreshProducts() {
    productsTable.innerHTML = "";

    data.products = getProducts();

    if (data.products) {
      data.products.forEach((product) => {
        let tr = document.createElement("tr");
        let tdNameProduct = document.createElement("td");
        let tdImg=document.createElement("td");
        let tdDescription = document.createElement("td");
        let tdPrice = document.createElement("td");
        let tdDistributor = document.createElement("td");
        let tdQuantity = document.createElement("td");
        let tdCategory = document.createElement("td");
        let tdActions = document.createElement("td");

        tdActions.id = product.id;
        tdNameProduct.innerText = product.name;
        tdImg.innerHTML= `<img src="${product.picture}" class="card-img-top" alt="no-image"> </img>`;
        tdDescription.innerText = product.description;
        tdPrice.innerText = product.price;
        tdDistributor.innerText = product.distributor;
        tdQuantity.innerText = product.quantity;
        tdCategory.innerText = product.category;
        tdActions.innerHTML = `<a id='${product.id}' href='#' style='color: black;' data-bs-toggle="modal" data-bs-target="#adminModal">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                  <path d="M16 5l3 3" /></svg>
                              </a>`;

        tr.appendChild(tdNameProduct);
        tr.appendChild(tdImg);
        tr.appendChild(tdDescription);
        tr.appendChild(tdPrice);
        tr.appendChild(tdDistributor);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdCategory);
        tr.appendChild(tdActions);
        productsTable.appendChild(tr);
      });

      data.products.forEach((product) => {
        const btnModify = document.getElementById(product.id);

        if (btnModify) {
          btnModify.addEventListener("click", (e) => {
            console.log(e.target.parentElement.id);
            currents.product = getProductById(e.target.parentElement.id);

            if (currents.product) {
              updateName.value = currents.product.name;
              updateDescription.value = currents.product.description;
              updatePrice.value = currents.product.price;
              updatePicture.value = currents.product.picture;
              updateDistributor.value = currents.product.distributor;
              updateQuantity.value = currents.product.quantity;
              updateCategory.value = currents.product.category;
            } else {
              updateName.value = "";
              updateDescription.value = "";
              updatePrice.value = "";
              updatePicture.value = "";
              updateDistributor.value = "";
              updateQuantity.value = "";
              updateCategory.value = "";
            }
          });
        }
      });
    }
  }

  //#region Functions
  function refresh(callback) {
    callback();
  }