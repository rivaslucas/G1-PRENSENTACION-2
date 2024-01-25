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
  console.log(`Producto ${product.name} agregado al carrito`);

  // Puedes actualizar la interfaz de usuario o realizar otras acciones según tus necesidades
  updateCartUI();
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
  return `<div class="card" style="width: 18rem;">
    <img src="${picture}" class="card-img-top" alt="no-image" style="width: 250px;">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${price}</p>
      <p class="card-text">${distributor}</p>
      <p class="card-text">${quantity}</p>
      <p class="card-text">${category}</p>
      <a href="./products_id.html?id=${id}" class="btn btn-dark">Detalle</a>
      <a id="productAddCart_${id}" class="btn btn-success">Agregar</a>
    </div>
  </div>`;
}
