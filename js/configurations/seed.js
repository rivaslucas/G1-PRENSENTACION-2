//La semilla que inicia nuestro sistema
//es decir los datos necesarios
//para que el sistema comience a funcionar  de 0

const INITIAL_ROLES = [
  {
    id: 1,
    description: "Cliente",
  },
  {
    id: 2,
    description: "Admin",
  },
 
];

const SEMINARS = [
  {
    id: crypto.randomUUID(),
    title: "Introducción a HTML y CSS",
    description: "Charla dictada por un expero en html.",
    date: Date.now(),
    time: "18:00hs",
    picture:
      "https://image.api.playstation.com/vulcan/ap/rnd/202310/0214/b449973c0d7f4afc176aa1debb996b472718ce0f4175e02b.png",
    stars: 5,
    difficult: 1,
  },
  {
    id: crypto.randomUUID(),
    title: "Javascript Inicial",
    description:
      "Conoce las bases iniciales de Javascript para programación web",
    date: Date.now(),
    time: "15:00hs",
    picture:
      "https://image.api.playstation.com/vulcan/ap/rnd/202310/0214/b449973c0d7f4afc176aa1debb996b472718ce0f4175e02b.png",
    stars: 4,
    difficult: 3,
  },
];

const ROLES_VALUES = {
  CLIENTE: 1,
  ADMIN: 2,
};

export { INITIAL_ROLES, ROLES_VALUES, SEMINARS };
