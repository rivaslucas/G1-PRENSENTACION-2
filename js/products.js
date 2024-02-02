// products.js

import { getProducts } from "./services/products.app.js";

const products = getProducts();
const divContainer = document.getElementById("card-container");

let cart = []; // Cambia la estructura del carrito a un array directo

if (products) {
  console.log(products);
  refresh();
}

function refresh() {
  let htmlString = "";
  divContainer.innerHTML = "";

  products.forEach((product) => {
    htmlString += getHtmlCard(
      product.picture,
      product.id,
      product.name,
      product.price,
      product.distributor,
      product.quantity,
      product.category
    );
  });

  divContainer.innerHTML = htmlString;

  products.forEach((product) => {
    const addProductToCartBtn = document.getElementById(`productAddCart_${product.id}`);
    if (addProductToCartBtn) {
      addProductToCartBtn.addEventListener("click", () => {
        addToCart(product);
      });
    }
  });
}

function addToCart(product) {
  // Verificar si el carrito está almacenado en el localStorage
  const storedCart = localStorage.getItem("cart");
 console.log(storedCart);
  // Si el carrito ya existe en el localStorage, cargarlo
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }

  // Verificar si el producto ya está en el carrito
  const existingProduct = cart.find((p) => p.id === product.id);

  if (existingProduct) {
    // Si el producto ya está en el carrito, actualizar la cantidad
    existingProduct.quantity += 1;
  } else {
    // Si el producto no está en el carrito, agregarlo con cantidad 1
    const newProduct = { ...product, quantity: 1 };
    cart.push(newProduct);
  }

  // Actualizar el carrito en el localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Puedes realizar otras acciones después de agregar al carrito si es necesario
  showNotification("Producto agregado al carrito con éxito");

  // Puedes actualizar la interfaz de usuario o realizar otras acciones según tus necesidades
  updateCartUI();
}
function showNotification() {
  const notification = document.getElementById('notification');
  
  // Mostrar la notificación
  notification.style.display = 'block';

  // Ocultar la notificación después de 1 segundo (1000 milisegundos)
  setTimeout(() => {
    notification.style.display = 'none';
  }, 1000);
}
function updateCartUI() {
  // Esta función se encargaría de actualizar la interfaz de usuario
  // Puedes implementarla según la lógica necesaria para tu aplicación
  // Por ejemplo, puedes actualizar el contador de productos en el carrito en la interfaz de usuario
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.reduce((total, product) => total + product.quantity, 0).toString();
  }
}

function getHtmlCard(picture, id, name, price, distributor, quantity, category) {
  
  return `<div class="col-ms-12 col-md-6 col-lg-3 mb-3"  >
          <div class="card carta shadow border-light text-center ">
              <img src="${picture}" class="card-img-top img-fluid" alt="img producto" />
              <div class="card-body text-center">
                <h5 class="card-title fuente m-0 negrita">Producto: ${name}</h5>
                <p class="card-text m-0">Distribuidor: ${distributor}</p>
                <p class="card-text m-0">Cantidad: ${quantity}</p>
                <p class="card-text m-0">Categoria: ${category}</p>
                <p class="card-text m-0">Precio:<p class="precio"> ${price}</p></p>
                <a href="./products_id.html?id=${id}" class="btn btn-warning m-1">Detalle</a>
                <a id="productAddCart_${id}" class="btn btn-success m-1">Agregar</a>
              </div>
            </div>
          </div>`;

}


function displayProducts(productsToDisplay) {
  let htmlString = "";
  divContainer.innerHTML = "";

  productsToDisplay.forEach((product) => {
    htmlString += getHtmlCard(
      product.picture,
      product.id,
      product.name,
      product.price,
      product.distributor,
      product.quantity,
      product.category
    );
  });

  divContainer.innerHTML = htmlString;

  // Calcular la altura mínima en función del número de productos
  const minHeight = Math.max(300, productsToDisplay.length * 150); // Ajusta según sea necesario

  divContainer.style.minHeight = `${minHeight}px`;

  productsToDisplay.forEach((product) => {
    const addProductToCartBtn = document.getElementById(`productAddCart_${product.id}`);
    if (addProductToCartBtn) {
      addProductToCartBtn.addEventListener("click", () => {
        addToCart(product);
      });
    }
  });
}

function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim().toLowerCase();
  searchProducts(searchTerm);
}

function searchProducts(searchTerm) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  displayProducts(filteredProducts);
}

function initializePage() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearchInput);
  displayProducts(products);
}

document.addEventListener("DOMContentLoaded", initializePage);