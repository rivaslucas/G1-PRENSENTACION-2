import { getEmojiText } from "./helpers/string.helper.convert.js";
import {
  createSeminar,
  deleteSeminar,
  getSeminarById,
  updateSeminar,
  getSeminars,
} from "./services/seminars.app.js";
import { getUsers,createUser,createUserRolCommon } from "./services/user.app.js";
import { GetItem } from "../js/services/local-storage.app.js";
import { LOCAL_STORAGE_KEYS } from "./configurations/keys.config.js";
import { ROLES_VALUES,INITIAL_ROLES } from "./configurations/seed.js";

const userLogged = GetItem(LOCAL_STORAGE_KEYS.activeUser);

if ((userLogged && userLogged.rol.id !== ROLES_VALUES.ADMIN) || !userLogged) {
  window.location.href = "/";
}

//#region HTML  References
const usersTable = document.getElementById("users-table");
const seminarsTable = document.getElementById("seminars-table");
const deleteSeminarBtn = document.getElementById("deleteSeminar");




//#region  Create

const createTitle = document.getElementById("createTitle");
const createDescription = document.getElementById("createDescriptionTxtArea");
const createPicture = document.getElementById("createPicture");
const createDifficult = document.getElementById("createDifficult");
const createStars = document.getElementById("createStars");



//#region  Update
const updateSeminarBtn = document.getElementById("update");
const updatePicture = document.getElementById("picture");
const updateDifficult = document.getElementById("difficult");
const updateStars = document.getElementById("stars");
const updateDescription = document.getElementById("descriptionTxtArea");
const updateTitle = document.getElementById("title");
//#endregion

//#endregion HTML References

//#region  Variables

let data = {
  users: [],
  seminars: [],
};

let currents = {
  seminar: {},
  user: {},
};

//variables de creacion

//#endregion Variables

//#region  Init Data
refresh(refreshUsers);
refresh(refreshSeminars);
//#endregion Init Data

//#region  Events

deleteSeminarBtn.addEventListener("click", () => {
  deleteSeminar(currents.seminar.id);
  window.location.reload();
});


document.addEventListener("DOMContentLoaded", function () {
  const addSeminarForm = document.getElementById("seminaradd");

  if (addSeminarForm) {
    addSeminarForm.addEventListener("submit", function (e) {
      // Get the values from the form
      const _createTitle = createTitle.value;
      const _createDescription = createDescription.value;
      const _createPicture =createPicture.value;
      const _createDifficult = createDifficult.value;
      const _createStars = createStars.value;

      // Perform validation
     
       createSeminar(_createTitle,_createDescription,'123','19:00',_createPicture,_createStars,_createDifficult);
     
    });
  }
});


updateSeminarBtn.addEventListener("click", () => {
  if (currents.seminar.id) {
    updateSeminar(
      currents.seminar.id,
      updateTitle.value,
      updateDescription.value,
      currents.seminar.date,
      currents.seminar.time,
      updatePicture.value,
      currents.seminar.difficult, // Mantener la dificultad actual
      updateDifficult.value, // Nueva dificultad
      currents.seminar.stars, // Mantener las estrellas actuales
      updateStars.value // Nuevas estrellas
    );
    // Actualizar la interfaz después de la modificación
    refresh(refreshSeminars);
  }
  document.getElementById("notUpdate")?.click();
});

//#region Create inptus Events

createTitle.addEventListener("change", (e) => {
  _createTitle = e.target.value;
});
createDescription.addEventListener("change", (e) => {
  _createDescription = e.target.value;
});
createPicture.addEventListener("change", (e) => {
  _createPicture = e.target.value;
});
createDifficult.addEventListener("change", (e) => {
  _createDifficult = +e.target.value;
});
createStars.addEventListener("change", (e) => {
  _createStars = +e.target.value;
});
//#endregion Create Inputs Events
//#endregion Events

//#region Functions
function refresh(callback) {
  callback();
}

function refreshUsers() {
  data.users = getUsers();
  if (data.users) {
    data.users.forEach((user) => {
      delete user.password;
    });
  }
}

function refreshSeminars() {
  seminarsTable.innerHTML = "";

  data.seminars = getSeminars();

  if (data.seminars) {
    data.seminars.forEach((seminar) => {
      let tr = document.createElement("tr");
      let tdTitle = document.createElement("td");
      let tdDate = document.createElement("td");
      let tdTime = document.createElement("td");
      let tdDifficult = document.createElement("td");
      let tdRank = document.createElement("td");
      let tdActions = document.createElement("td");

      tdActions.id = seminar.id;
      tdTitle.innerText = seminar.title;
      tdDate.innerText = seminar.date;
      tdTime.innerText = seminar.time;
      tdDifficult.innerText = getEmojiText(seminar.difficult, "⭐");
      tdRank.innerText = getEmojiText(seminar.stars, "⭐");
      tdActions.innerHTML = `<a id='${seminar.id}' href='#' style='color: black;' data-bs-toggle="modal" data-bs-target="#adminModal">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                <path d="M16 5l3 3" /></svg>
                            </a>`;

      tr.appendChild(tdTitle);
      tr.appendChild(tdDate);
      tr.appendChild(tdTime);
      tr.appendChild(tdDifficult);
      tr.appendChild(tdRank);
      tr.appendChild(tdActions);
      seminarsTable.appendChild(tr);
    });

    data.seminars.forEach((seminar) => {
      const btnModify = document.getElementById(seminar.id);

      if (btnModify) {
        btnModify.addEventListener("click", (e) => {
          console.log(e.target.parentElement.id);
          currents.seminar = getSeminarById(e.target.parentElement.id);

          if (currents.seminar) {
            updateTitle.value = currents.seminar.title;
            updatePicture.value = currents.seminar.picture;
            updateDifficult.value = currents.seminar.difficult;
            updateStars.value = currents.seminar.stars;
            updateDescription.value = currents.seminar.description;
          } else {
            updateTitle.value = "";
            updatePicture.value = "";
            updateDifficult.value = "";
            updateStars.value = "";
            updateDescription.value = "";
          }
        });
      }
    });
  }
}

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

      console.log(
        _createUsername,
        _createPass,
        _createName,
        _createLastname,
        _createDirection,
        _createTel,
        selectedRoleId,
      );

      if (_createPass === _createRePass) {
        
        if (selectedRoleId === "ADMIN") {
          if (!createUser(_createUsername, _createPass, _createName, _createLastname , INITIAL_ROLES.find((rol) => rol.id === 2), _createDirection, _createTel)) {
       
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

//#endregion Functions
