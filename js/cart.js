


//import {deleteProductCart} from "./services/cart.app.js";

const productTable = document.getElementById("product-table");
const deleteProductBtn = document.getElementById("deleteProduct");

let data = {
  users: [],
  products: [],
  cart: [],
};

let currents = {
  product: {},
  user: {},
};

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-warning')) {
    // Botón de aumento
    const productId = e.target.getAttribute('data-product-id');
    increaseQuantity(productId);
  } else if (e.target.classList.contains('btn-success')) {
    // Botón de disminución
    const productId = e.target.getAttribute('data-product-id');
    decreaseQuantity(productId);
  }
});

refresh(refreshProducts);
actualizarTotalCompra();
async function refreshProducts() {
  productTable.innerHTML = "";

  try {
    // Obtenemos el carrito desde el localStorage
    data.cart =getCart();
    if (data.cart) data.cart =data.cart;
    if (data.cart && data.cart.length > 0) {
      data.cart.forEach((product) => {
        let tr = document.createElement("tr");
        let tdNameProduct = document.createElement("td");
        let tdImg = document.createElement("td");
        let tdPrice = document.createElement("td");
        let tdDistributor = document.createElement("td");
        let tdQuantity = document.createElement("td");
        let tdSubTotal= document.createElement("td");
        let tdCategory = document.createElement("td");
        let tdActions = document.createElement("td");
        let increaseButton = document.createElement('button');
        let decreaseButton = document.createElement('button');

        increaseButton.innerText = '+';
        increaseButton.setAttribute('data-product-id', product.id);
        increaseButton.classList.add('btn', 'btn-warning', 'me-1');
        decreaseButton.innerText = '-';
        decreaseButton.setAttribute('data-product-id', product.id);
        decreaseButton.classList.add('btn', 'btn-success', 'ms-1');
  
        tdActions.id = product.id;
        tdNameProduct.innerText = product.name;
        tdImg.innerHTML = `<img src="${product.picture}" class="card-img-top imagecart m-0" alt="no-image"> </img>`;
        tdPrice.innerText = product.price;
        tdDistributor.innerText = product.distributor;
        tdQuantity.innerText = product.quantity;
        tdSubTotal.innerText= product.quantity*product.price;
        tdCategory.innerText = product.category;
    
        tdActions.appendChild(increaseButton);
    
        tdActions.appendChild(decreaseButton);
        tr.appendChild(tdNameProduct);
        tr.appendChild(tdImg);
        tr.appendChild(tdPrice);
        tr.appendChild(tdDistributor);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdSubTotal);
        tr.appendChild(tdCategory);
        tr.appendChild(tdActions);
       
        productTable.appendChild(tr);
      });

      data.cart.forEach((product) => {
        const btnModify = document.getElementById(product.id);

        if (btnModify) {
          btnModify.addEventListener("click", (e) => {
            // ... (código para manejar eventos al hacer clic en un botón)
          });
        }
      });
    } else {
      console.log("No hay productos en el carrito o data.cart es un array vacío");
    }
  } catch (error) {
    console.error(error);
  }
  actualizarTotalCompra();
}

// ...
// ...

// ...



 function getCart() {
  try {
    const cart = localStorage.getItem("cart");
    console.log(cart);
 
    // Si cart no es null ni undefined, intentamos convertirlo a un array
    if (cart !== null && cart !== undefined) {
      // Intentamos convertir a array, si no es posible, devolvemos un array vacío
      try {
        const parsedCart = JSON.parse(cart);

        if (Array.isArray(parsedCart)) {
          return parsedCart;
        } else {
          console.error("El carrito almacenado no es un array válido:", cart);
          return [];
        }
      } catch (parseError) {
        console.error("Error al parsear el carrito almacenado:", parseError);
        return [];
      }
    }

    // Si cart es null o undefined, devolvemos un array vacío
    return [];
  } catch (error) {
    console.error("Error al obtener el carrito desde el localStorage:", error);
    return [];
  }
}
document.addEventListener('click', handleButtonClick);

function handleButtonClick(e) {
  if (e.target.classList.contains('btn-warning')) {
    // Botón de aumento
    const productId = e.target.getAttribute('data-product-id');
    increaseQuantity(productId);
  } else if (e.target.classList.contains('btn-success')) {
    // Botón de disminución
    const productId = e.target.getAttribute('data-product-id');
    decreaseQuantity(productId);
  }
}

function increaseQuantity(productId) {
  document.removeEventListener('click', handleButtonClick); // Desactivar eventos
  const product = data.cart.find(p => p.id === productId);
  if (product) {
    product.quantity += 1;
    setCart(data.cart);
    actualizarTotalCompra();
    refreshProducts();
  }
  document.addEventListener('click', handleButtonClick); // Reactivar eventos
}

function decreaseQuantity(productId) {
  document.removeEventListener('click', handleButtonClick); // Desactivar eventos
  const product = data.cart.find(p => p.id === productId);
  if(product.quantity==1){
    showDeleteModal(product.id);
  }
  else if (product && product.quantity > 1) {
    product.quantity -= 1;
    setCart(data.cart);
    actualizarTotalCompra();
    refreshProducts();
  }
  document.addEventListener('click', handleButtonClick); // Reactivar eventos
}
function showDeleteModal(productId) {
  const modal = document.getElementById('deleteModal');
  modal.style.display = 'block';

  const confirmBtn = document.getElementById('confirmDelete');
  const cancelBtn = document.getElementById('cancelDelete');

  confirmBtn.addEventListener('click', () => {
    // Eliminar el producto y cerrar el modal
    deleteProductCart(productId);
    console.log(productId);
    modal.style.display = 'none';
  });

  cancelBtn.addEventListener('click', () => {
    // Cerrar el modal sin eliminar el producto
    modal.style.display = 'none';
  });
}
function deleteProductCart(id) {
  const products = getCart();

  if (products !== null && products.length > 0) {
    let newProductsArray = products.filter(function (product) {
      return product.id !== id;
    });

    setCart(newProductsArray);
    actualizarTotalCompra();
    refreshProducts();
  }
}



function setCart(cart) {
   // Actualizar el carrito en el localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function refresh(callback) {
  callback();
}
function actualizarTotalCompra() {
  try {
    let total = 0;

    // Itera sobre los productos en el carrito y suma los subtotales
    data.cart.forEach((product) => {
      total += product.price * product.quantity;
    });

    // Actualiza el contenido del elemento con id 'totalAmount'
    const totalAmountElement = document.getElementById('totalAmount');
    if (totalAmountElement) {
      totalAmountElement.innerText = total.toFixed(2);
    } else {
      console.error("Elemento con id 'totalAmount' no encontrado.");
    }
  } catch (error) {
    console.error("Error al actualizar el total de la compra:", error);
  }
}

// ...
