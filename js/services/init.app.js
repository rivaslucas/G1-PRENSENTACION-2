import { LOCAL_STORAGE_KEYS } from "../configurations/keys.config.js";

import { INITIAL_ROLES, PRODUCTS } from "../configurations/seed.js";

import { LocalStorageLength, SetItem } from "./local-storage.app.js";
import { createUser, login, logout } from "./user.app.js";

{
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
  );
}
