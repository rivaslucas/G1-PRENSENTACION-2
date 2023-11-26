//crear usuario (registro), login, logout
import { SetItem, GetItem, RemoveItem } from "./local-storage.app.js";
import { LOCAL_STORAGE_KEYS } from "../configurations/keys.config.js";
import { ERROR_MESSAGES } from "../configurations/messages.config.js";
import { GetError } from "../helpers/error.helpers.js";
import { INITIAL_ROLES, ROLES_VALUES } from "../configurations/seed.js";

//#region  Errores
function GetErrorNotFound() {
  return GetError(ERROR_MESSAGES.not_found);
}

function GetErrorNotMatch() {
  return GetError(ERROR_MESSAGES.not_match);
}
//#endregion

//#region  Get User (R - Read - Leer)
function getUsers() {
  return GetItem(LOCAL_STORAGE_KEYS.user);
}
//#endregion

//#region  Add User (A - Alta)
function createUser(username, password, name, lastname, rol) {
  let users = getArrayAndReplace({ username, password, name, lastname, rol });
  //guardamos el array en el local storage
  SetItem(LOCAL_STORAGE_KEYS.user, users);
}

function createrUserRolCommon(username, password, name, lastname) {
  createUser(
    username,
    password,
    name,
    lastname,
    INITIAL_ROLES.find((rol) => rol.id === ROLES_VALUES.CONCURRENTE)
  );
}

function getArrayAndReplace(newUser) {
  //traer el array convertido en array
  let users = getUsers();
  //en caso de que no exista ningún elemento creado lo convertir en array
  if (users === null) {
    users = [];
  }

  //almacenamos el nuevo usuario en el array
  users.push(newUser);

  //retornamos el arary con el usuario agregado
  return users;
}
//#endregion

//#region  Login and Logout
function login(username, password) {
  //verificar si el usuario existe
  //comparar en la base de datos si existe un
  //usuario con el mismo username y la misma contraseña
  let users = getUsers();

  if (users === null) {
    return GetErrorNotFound();
  }

  //predicate -> condición
  let userFound = users.find((user) => user.username === username);

  if (!userFound) {
    return GetErrorNotMatch();
  }

  if (userFound.password !== password) {
    return GetErrorNotMatch();
  }

  SetItem(LOCAL_STORAGE_KEYS.activeUser, userFound);
  delete userFound.password;
  return {
    ok: true,
    user: userFound,
  };
}

function logout() {
  RemoveItem(LOCAL_STORAGE_KEYS.activeUser);
}

//#endregion Login and Logout

export { createUser, login, logout, createrUserRolCommon, getUsers };
