import { LOCAL_STORAGE_KEYS } from "../configurations/keys.config.js";

import { INITIAL_ROLES, SEMINARS } from "../configurations/seed.js";

import { LocalStorageLength, SetItem } from "./local-storage.app.js";
import { createUser, login, logout } from "./user.app.js";

if (LocalStorageLength === 0) {
  SetItem(LOCAL_STORAGE_KEYS.roles, INITIAL_ROLES);
  SetItem(LOCAL_STORAGE_KEYS.seminar, SEMINARS);
  createUser(
    "gnm",
    "12345",
    "gero",
    "lopez",
    INITIAL_ROLES.find((rol) => rol.id === 3)
  );
}
