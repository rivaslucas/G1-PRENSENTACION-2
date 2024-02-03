import { getUsers,createUser,createUserRolCommon,updateUser,getUserByUsername,deleteUser } from "./services/user.app.js";

import { ROLES_VALUES,INITIAL_ROLES } from "./configurations/seed.js";



document.addEventListener("DOMContentLoaded", function () {
    const addUserForm = document.getElementById("userAddCommon");
  
    if (addUserForm) {
      addUserForm.addEventListener("submit", function (e) {
        e.preventDefault();
    // Evitar el comportamiento predeterminado del formulario
  
       
        let selectedRoleId ;
  
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





// function createUserRolCommon(username, password, name, lastname, direction, tel) {
//     createUser(
//       username,
//       password,
//       name,
//       lastname,
//       INITIAL_ROLES.find((rol) => rol.id === ROLES_VALUES.CLIENTE),
//       direction,
//       tel
//     );