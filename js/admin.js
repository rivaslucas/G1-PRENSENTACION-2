  import { getEmojiText } from "./helpers/string.helper.convert.js";
  import {
    createProduct,
    deleteProduct,
    getProductsById,	
    updateProduct,
    getProducts,
  } from "./services/products.app.js";
  import { getUsers,createUser,createUserRolCommon,updateUser,getUserByUsername,deleteUser } from "./services/user.app.js";
  import { GetItem } from "../js/services/local-storage.app.js";
  import { LOCAL_STORAGE_KEYS } from "./configurations/keys.config.js";
  import { ROLES_VALUES,INITIAL_ROLES } from "./configurations/seed.js";

  const userLogged = GetItem(LOCAL_STORAGE_KEYS.activeUser);

  if ((userLogged && userLogged.rol.id !== ROLES_VALUES.ADMIN) || !userLogged) {
    window.location.href = "/";
  }

  //#region HTML  References
  const usersTable = document.getElementById("users-table");
  const productsTable = document.getElementById("products-table");
  const deleteProductBtn = document.getElementById("deleteProduct");
  const deleteUserBtn= document.getElementById("deleteUsers");
  const updateUserForm= document.getElementById("updateUserConfirm");
  //#endregion


  //#region  Create Products

  const createNameProduct = document.getElementById("createNameProduct");
  const createDescription = document.getElementById("createDescription");
  const createPrice = document.getElementById("createPrice");
  const createPicture = document.getElementById("createPicture");
  const createDistributor = document.getElementById("createDistributor");
  const createQuantity = document.getElementById("createQuantity");
  const createCategory = document.getElementById("createCategory");

  let _createNameProduct =createNameProduct.value,
    _createDescription=createDescription.value,
    _createPrice=createPrice.value,
    _createPicture=createPicture.value,
    _createDistributor=createDistributor.value,
    _createQuantity=createQuantity.value,
    _createCategory=createCategory.value;
  //#endregion


  //#region  Update
  const updateProductBtn = document.getElementById("updateProduct");
  const updateName = document.getElementById("name");
  const updateDescription = document.getElementById("description");
  const updatePrice = document.getElementById("price");
  const updatePicture = document.getElementById("picture");
  const updateDistributor = document.getElementById("distributor");
  const updateQuantity = document.getElementById("quantity");
  const updateCategory = document.getElementById("category");
  //#endregion

  //------------users---------
  // const updateUsername= document.getElementById("updateUsername");
  // const updatePass=document.getElementById("updateActualPass");
  // const updateNewPass=document.getElementById("updateNewPass");
  const updateNameuser=document.getElementById('updateName');
  // const updateLastname=document.getElementById("updateLastname");
  // const updateRol=document.getElementById("updateRol");
  // const updateDirection=document.getElementById("updateDirection");
  // const updateTel=document.getElementById("updateTel");
  // const updateUserBtn=document.getElementById("updateUser");
  // //#endregion


  //#endregion HTML References

  //#region  Variables

  let data = {
    users: [],
    products: [],
  };

  let currents = {
    product: {},
    user: {},
  };

  //variables de creacion

  //#endregion Variables

  //#region  Init Data

  refresh(refreshProducts);
  refresh(refreshUsers);
  //#endregion Init Data

  //#region  Events
  deleteProductBtn.addEventListener("click", async () => {
    try {
      let productId = currents.product.id;
      await deleteProduct(productId);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  });
  
  deleteUserBtn.addEventListener("click", async () => {
    try {
      let i = currents.user.id;
      console.log(i);
      await deleteUser(i);
    window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const addProductForm = document.getElementById("productadd");

    if (addProductForm) {
      addProductForm.addEventListener("submit", function (e) {
        // Get the values from the form
        const _createName = createNameProduct.value;
        const _createDescription = createDescription.value;
        const _createPrice = createPrice.value;
        const _createPicture = createPicture.value;
        const _createDistributor = createDistributor.value;
        const _createQuantity = createQuantity.value;
        const _createCategory = createCategory.value;
        // Perform validation
      
        createProduct(_createName,_createDescription,_createPrice,_createPicture,_createDistributor,_createQuantity,_createCategory);
      
      });
    }
  });
  updateProductBtn.addEventListener("click", () => {
    if (currents.product.id) {
      updateProduct(
        currents.product.id,
        updateName.value,
        updateDescription.value,
        updatePrice.value,
        updatePicture.value,
        updateDistributor.value,
        updateQuantity.value, 
        updateCategory.value 
      );
      // Actualizar la interfaz después de la modificación
      refresh(refreshProducts);
    }
    document.getElementById("notUpdate")?.click();
  });

  //#region Functions
  function refresh(callback) {
    callback();
  }
  function refreshProducts() {
    productsTable.innerHTML = "";

    data.products = getProducts();

    if (data.products) {
      data.products.forEach((product) => {
        let tr = document.createElement("tr");
        let tdNameProduct = document.createElement("td");
        let tdDescription = document.createElement("td");
        let tdPrice = document.createElement("td");
        let tdDistributor = document.createElement("td");
        let tdQuantity = document.createElement("td");
        let tdCategory = document.createElement("td");
        let tdActions = document.createElement("td");

        tdActions.id = product.id;
        tdNameProduct.innerText = product.name;
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
            currents.product = getProductsById(e.target.parentElement.id);

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
  //----------------Users---------------------

  document.addEventListener("DOMContentLoaded", function () {
    const addUserForm = document.getElementById("userAdd");

    if (addUserForm) {
      addUserForm.addEventListener("submit", function (e) {
    // Evitar el comportamiento predeterminado del formulario

        const userRolSelect = document.getElementById("createRol");
        const selectedOption = userRolSelect.options[userRolSelect.selectedIndex];
        const selectedRoleId = selectedOption.value;

        // Obtener los valores del formulario
        const _createUsername = document.getElementById("createUsername").value;
        const _createPass = document.getElementById("createPass").value;
        const _createRePass = document.getElementById("createRePass").value;
        const _createName = document.getElementById("createName").value;
        const _createLastname = document.getElementById("createLastname").value;
        const _createDirection = document.getElementById("createDirection").value;
        const _createTel = document.getElementById("createTel").value;

    
        if (_createPass === _createRePass) {
          
          if (selectedRoleId === "ADMIN") {
            if (!createUser(_createUsername, _createPass, _createName, _createLastname , INITIAL_ROLES.find((rol) => rol.id === 1), _createDirection, _createTel)) {
        
            }
          } else {
            createUserRolCommon(_createUsername, _createPass, _createName, _createLastname, _createDirection, _createTel);
          }
        } else {
          alert("Las contraseñas no coinciden");
        }
      });
    }
  });
  //---------------functions users--------------

  function refreshUsers() {
    usersTable.innerHTML = "";

    data.Users = getUsers();

    if (data.Users) {
      data.Users.forEach((user) => {
        let tr = document.createElement("tr");
        let tdUsername = document.createElement("td");
        let tdName = document.createElement("td");
        let tdLastname = document.createElement("td");
        let tdRol = document.createElement("td");
        let tdDirection = document.createElement("td");
        let tdTel = document.createElement("td");
        let tdActions = document.createElement("td");

        tdActions.id =user.username;
        tdUsername.innerText = user.username;
        tdName.innerText = user.name;
        tdLastname.innerText = user.lastname;
        if(user.rol.id==1){
          tdRol.innerText= 'Administrador';}
          else if(user.rol.id==0){
            tdRol.innerText='Cliente';
          }
        else{
          tdRol.innerText="";

        }
        tdDirection.innerText = user.direction;
        tdTel.innerText = user.tel;
        tdActions.innerHTML = `<a id='${user.username}' href='#' style='color: black;' data-bs-toggle="modal" data-bs-target="#adminUserModal">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                  <path d="M16 5l3 3" /></svg>
                              </a>`;

        tr.appendChild(tdUsername);
        tr.appendChild(tdName);
        tr.appendChild(tdLastname);
        tr.appendChild(tdRol);
        tr.appendChild(tdDirection);
        tr.appendChild(tdTel);
        tr.appendChild(tdActions);
        usersTable.appendChild(tr);
      });

    
      data.Users.forEach((user) => {
        const btnUserModify = document.getElementById(user.username);
      
        if (btnUserModify) {
          btnUserModify.addEventListener("click", (e) => {
          
          
            currents.user = getUserByUsername(e.target.parentElement.id);
      
            if (currents.user && currents.user.username) {
            
              updateUsername.value = currents.user.username;
              updatePass.value = currents.user.password;
              updateNameuser.value = currents.user.name;
              updateLastname.value = currents.user.lastname;
              updateRol.selectedIndex=currents.user.rol.id; 
              updateDirection.value = currents.user.direction;
              updateTel.value = currents.user.tel;
              
            } else {
              updateUsername.value = "";
              updateNameuser.value = "";
              updateLastname.value = "";
            
              updateDirection.value = "";
              updateTel.value = "";
              // Limpia otros campos del formulario si no hay usuario seleccionado
            }
          });
        }
      });
      
      
    }
  };

  // ...

  updateUserForm.addEventListener("submit", () => {

    if (currents.user) {
      let Id=currents.user.id;
      let newUsername = updateUsername.value;
      let newPass = updatePass.value;
      let newNameuser = updateNameuser.value;
      let newLastname = updateLastname.value;
      const userRolSelect = document.getElementById("updateRol");
      const selectedOption = userRolSelect.options;
      let newRol = selectedOption.selectedIndex;
      let newDirection = updateDirection.value;
      let newTel = updateTel.value;

      updateUser(
        Id,
        newUsername,
        newPass,
        newNameuser,
        newLastname,
        newRol,
        newDirection,
        newTel
      );
    }
  });

  // ...


  //#endregion Functions
