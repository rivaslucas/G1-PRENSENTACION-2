import { SetItem, GetItem } from "./local-storage.app.js";
import { LOCAL_STORAGE_KEYS } from "../configurations/keys.config.js";

//#region  Get User (R - Read - Leer)
function getSeminars() {
  return GetItem(LOCAL_STORAGE_KEYS.seminar);
}
//#endregion
function createSeminar(
  title,
  description,
  date,
  time,
  picture,
  difficult,
  stars)
  
 {
  
  let seminars = getArrayAndReplace({
    id: crypto.randomUUID(), // Ensure you have a function to generate unique IDs
    title,
    description,
    date,
    time,
    picture,
    difficult,
    stars,
  });
  // Guardamos el array en el local storage
  SetItem(LOCAL_STORAGE_KEYS.seminar, seminars);
}
//#region  Add User (A - Alta)

function getArrayAndReplace(newSeminar) {
  let seminars = getSeminars();

  if (seminars === null) {
    seminars = [];
  }

  seminars.push(newSeminar);

  return seminars;
}

function updateSeminar(
  id,
  title,
  description,
  date,
  time,
  picture,
  currentDifficult,
  newDifficult,
  currentStars,
  newStars
) {
  const seminars = getSeminars();
  if (seminars !== null && seminars.length > 0) {
    let index = seminars.findIndex(function (seminar) {
      return seminar.id === id;
    });
    let seminar = seminars[index];
    seminar.title = title;
    seminar.description = description;
    seminar.date = date;
    seminar.time = time;
    seminar.picture = picture;
    // Actualizar dificultad y estrellas solo si hay un cambio
    if (currentDifficult !== newDifficult) {
      seminar.difficult = newDifficult;
    }
    if (currentStars !== newStars) {
      seminar.stars = newStars;
    }
    seminars[index] = seminar;
    SetItem(LOCAL_STORAGE_KEYS.seminar, seminars);
  }
}

function deleteSeminar(id) {
  const seminars = getSeminars();

  if (seminars !== null && seminars.length > 0) {
    let newSeminarsArray = seminars.filter(function (seminar) {
      return seminar.id !== id;
    });

    SetItem(LOCAL_STORAGE_KEYS.seminar, newSeminarsArray);
  }
}

function getSeminarById(id) {
  const seminars = getSeminars();
  return seminars.find((seminar) => seminar.id === id);
}

//#endregion
export {
  getSeminars,
  createSeminar,
  deleteSeminar,
  updateSeminar,
  getSeminarById,
};
