import { LOCAL_STORAGE_KEYS } from "../configurations/keys.config.js";
import { INITIAL_ROLES, PRODUCTS } from "../configurations/seed.js";
import { LocalStorageLength, SetItem } from "./local-storage.app.js";
import { createUser, login, logout } from "./user.app.js";


// Obtén la bandera datosBorrados del localStorage
const datosBorrados = localStorage.getItem('datosBorrados');

// Si la bandera está presente y es 'true', borra los datos y establece la bandera a 'false'
if (datosBorrados === 'true') {
  // Lógica para borrar los datos
  localStorage.clear();  // Esto borra todos los datos en el localStorage

  // Actualiza la bandera para indicar que los datos han sido borrados
  localStorage.setItem('datosBorrados', 'false');
} 

// Luego, carga los datos si es necesario
if (LocalStorageLength <=1||LocalStorageLength>=2) {

  SetItem(LOCAL_STORAGE_KEYS.roles, INITIAL_ROLES);
  SetItem(LOCAL_STORAGE_KEYS.product, PRODUCTS);
  createUser(
    "user",
    "123456",
    "jose",
    "lucas",
    INITIAL_ROLES.find((rol) => rol.id === 1),
    "25 de MAYO 90",
    "3814455667",
    true,
  );
  localStorage.setItem("datosBorrados","true");
}
