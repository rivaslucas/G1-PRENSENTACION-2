//La semilla que inicia nuestro sistema
//es decir los datos necesarios
//para que el sistema comience a funcionar  de 0

const INITIAL_ROLES = [
  {
    id: 0,
    description: "Cliente",
  },
  {
    id: 1,
    description: "Admin",
  },
 
];


const PRODUCTS = [
  {
    id: crypto.randomUUID(),
    name: "Queso Cremoso Rosalat",
    description: "Es un queso fresco, de pasta blanda, cerrada algo elástica y cremosa; de sabor ligeramente ácido y aroma suave.",
    price: 5800,
    picture:"../img/productos/QUESO CREMOSO ROSALAT.jpg",
    distributor: "Autoservicios Capo",
    quantity: 50,
    category:"QUESOS"
  },
  {
    id: crypto.randomUUID(),
    name: "Jamon C. Piamontesa",
    description: "El jamón cocido es uno de los productos de charcutería más universales, pero también uno de los más desconocidos. Y no es más que el resultado de salar con salmuera, macerar y cocer la extremidad trasera del cerdo.",
    price: 8500,
    picture:"../img/productos/JAMON COCIDO PIAMONTESA.jpg",
    distributor: "Gomez Pardo",
    quantity: 29,
    category:"FIAMBRES"
  },
  {
    id: crypto.randomUUID(),
    name: "Salame Milán COFRA",
    description: "El salame tipo milán COFRA es un embutido seco, que se obtiene a partir de la mezcla de carne picada, tocino y condimentos.",
    price: 6200,
    picture:"../img/productos/SALAME COFRA.jpg",
    distributor: "Autoservicios Capo",
    quantity: 50,
    category:"SECOS"
  },
  {
    id: crypto.randomUUID(),
    name: "Queso Gruyere ORO",
    description: "Queso agujerado, de pasta color amarillo marfil y corteza marrón claro, se caracteriza por tener una forma circular",
    price: 7000,
    picture:"../img/productos/QUESO GRUYERE ORO.jpg",
    distributor: "Alem 500",
    quantity: 29,
    category:"QUESOS"
  },
  {
    id: crypto.randomUUID(),
    name: "Queso Tybo Cremac",
    description: "queso madurado que se obtiene por coagulación de la leche por medio del cuajo, complementada por la acción de bacterias lácticas específicas. Es un queso de mediana humedad y semigraso.",
    price: 4600,
    picture:"../img/productos/QUESO TYBO CREMAC.jpg",
    distributor: "Autoservicios Capo",
    quantity: 50,
    category:"QUESOS"
  },
  {
    id: crypto.randomUUID(),
    name: "Jamon Crudo Paladini",
    description: "El jamón crudo es un producto esencialmente natural, de sabor intenso y delicado, suave al paladar y con un agradable aroma característico, de consistencia firme y poca salada.",
    price: 4000,
    picture:"../img/productos/JAMON CRUDO PALADINI.jpg",
    distributor: "Alem 500",
    quantity: 29,
    category:"SECOS"
  },
  
];

const ROLES_VALUES = {
  CLIENTE: 0,
  ADMIN: 1,
};

export { INITIAL_ROLES, ROLES_VALUES, PRODUCTS };
