const pcParts = [
  {
    id: 1,
    category: 'MOTHERBOARD',
    title: 'Asus Prime H510m-e Intel S1200',
    price: 23500,
    description: 'PLACA MOTHER ASUS H510 (LGA 1200) micro ATX con PCIe 4.0, ranura M.2 de 32Gbps, Intel 1 Gb Ethernet, DisplayPort, HDMI, D-Sub, USB 3.2 Gen 1 Tipo A, SATA 6Gbps, encabezado COM, encabezado RGB.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_695891-MLA49512987244_032022-V.webp' 
  },
  {
    id: 2,
    category: 'MOTHERBOARD',
    title: 'Aorus B560 Pro Ax',
    price: 46000,
    description: 'El B560 AORUS PRO AX viene con una solución de energía mejorada, un diseño de enfriamiento increíble, todo el diseño PCIe 4.0 y una conectividad sobresaliente para elevar su experiencia de juego al siguiente nivel.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_831570-MLA46726337645_072021-V.webp' 
  },
  {
    id: 3,
    category: 'MOTHERBOARD',
    title: 'Asus Prime X570-p Am4',
    price: 55600,
    description: 'Socket AMD AM4: Listo para los procesadores AMD Ryzen™ de 3ra y 2da generación. Solución de energía mejorada: 8+4 fases de poder DrMOS, conectores ProCool, bobinas de aleación y condensadores duraderos para un suministro estable de energía.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_655623-MLA31968108870_082019-W.webp' 
  },
  {
    id: 4,
    category: 'CPU',
    title: 'Intel Core i3-10100F 4C/8T 4.3GHz',
    price: 20200,
    description: 'Productividad y entretenimiento, todo disponible en tu computadora de escritorio. La superioridad tecnológica de INTEL es un beneficio para todo tipo de profesionales. Asegura el mejor rendimiento de las aplicaciones, de la transferencia de datos y la conexión con otros elementos tecnológicos.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_852927-MLA44434412369_122020-W.webp' 
  },
  {
    id: 5,
    category: 'CPU',
    title: 'Intel Core i5-10400F 6C/12T 4.3GHz',
    price: 39800,
    description: 'Productividad y entretenimiento, todo disponible en tu computadora de escritorio. La superioridad tecnológica de INTEL es un beneficio para todo tipo de profesionales. Asegura el mejor rendimiento de las aplicaciones, de la transferencia de datos y la conexión con otros elementos tecnológicos.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_602530-MLA43003993713_082020-W.webp' 
  },
  {
    id: 6,
    category: 'CPU',
    title: 'AMD Ryzen 5 5600X 6C/12T 4.6GHz',
    price: 65500,
    description: 'En este producto, encontrarás los núcleos, que son los encargados de ejecutar las instrucciones y actividades que le asignás a tu dispositivo. Estos tienen relación directa con dos elementos: los hilos y el modelo. Por lo tanto, a la hora de elegir un procesador, es importante que valores los tres en su conjunto.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_806834-MLA44347094824_122020-W.webp' 
  },
  {
    id: 7,
    category: 'RAM',
    title: 'HyperX Fury Beast DDR4 RGB 8GB 3200MHz',
    price: 13000,
    description: 'La memoria Ram Kingston FURY Beast DDR4 RGB ofrece un aumento de rendimiento y estilo con velocidades de hasta 3733 MT/s, un estilo agresivo e iluminación RGB que recorre la longitud del módulo para lograr efectos increíbles y sorprendentes.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_685034-MLA52625681951_112022-W.webp' 
  },
  {
    id: 8,
    category: 'RAM',
    title: 'PNY XLR8 Gaming Epic-X DDR4 RGB 2x16GB 3200MHz',
    price: 28000,
    description: 'Si notás que tu computadora tiene bajo rendimiento o que su capacidad no se adapta a tus necesidades de uso, es momento de renovar su memoria RAM. Aumentarás su productividad y podrás trabajar de manera rápida y en simultáneo con múltiples aplicaciones.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_677059-MLA49041476800_022022-W.webp' 
  },
  {
    id: 9,
    category: 'RAM',
    title: 'Corsair Vengeance PRO DDR4 RGB 2x16GB 3600MHz',
    price: 35000,
    description: 'Con su tecnología DDR4, mejorará el desempeño de tu equipo, ya que opera en 3 y 4 canales, generando mayor fluidez y velocidad en la transferencia de datos. ¡Optimizá al máximo el rendimiento de tu ordenador!',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_903012-MLA48198905138_112021-W.webp' 
  },
  {
    id: 10,
    category: 'PSU',
    title: 'Thermaltake Tr-600w 80 Plus',
    price: 18000,
    description: 'Con la incorporación de diversos componentes de alta calidad en la nueva serie Smart. modelos que se clasifican desde los 500W hasta los 700W - Ahorra energía a través de su alta eficiencia de hasta un 86%, adaptándose a los requisitos más exigentes.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_914208-MLA49800915400_042022-W.webp' 
  },
  {
    id: 11,
    category: 'PSU',
    title: 'ADATA XPG Core Reactor 850W Gold',
    price: 26500,
    description: 'Con la fuente de alimentación XPG 850 podrás asegurar la corriente continua y estable de tu computadora de escritorio y optimizar el funcionamiento de sus componentes.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_911877-MLA47768073662_102021-W.webp' 
  },
  {
    id: 12,
    category: 'PSU',
    title: 'Seasonic GX-1000W Gold',
    price: 35500,
    description: 'La certificación 80 Plus Gold garantiza una eficiencia del 90% al 50% de carga. La mejor eficiencia energética conduce a menos desperdicio de energía, menos calor y menos ruido del ventilador. Y con el apoyo de los procesadores Intel, ahorrará más energía y más dinero.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_970883-MLA50151237295_052022-W.webp' 
  },
  {
    id: 13,
    category: 'GPU',
    title: 'MSI Nvidia GeForce RTX 2060 Super',
    price: 120000,
    description: 'Como cuenta con 2176 núcleos, los cálculos para el procesamiento de gráficos se realizarán de forma simultánea logrando un resultado óptimo del trabajo de la placa. Esto le permitirá ejecutar lecturas dispersas y rápidas de y hacia la GPU.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_851950-MLA42349749318_062020-W.webp' 
  },
  {
    id: 14,
    category: 'GPU',
    title: 'Zotac Nvidia GeForce RTX 3080Ti AMP!',
    price: 350000,
    description: 'Cuenta con 10240 núcleos, por lo que la interfaz de la placa será algo sorprendente. Este tipo de estructura es apropiado para el procesamiento de tecnologías más complejas y modernas caracterizadas por grandes volúmenes de datos.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_915648-MLA51901368261_102022-W.webp' 
  },
  {
    id: 15,
    category: 'GPU',
    title: 'PNY Nvidia GeForce RTX 3090Ti',
    price: 600000,
    description: 'Nvidia es el fabricante líder de placas de video; su calidad asegura una experiencia positiva en el desarrollo del motor gráfico de tu computadora. Además, sus procesadores usan tecnología de punta para que puedas disfrutar de un producto veloz y duradero.',
    pictureUrl: 'https://http2.mlstatic.com/D_NQ_NP_695591-MLA52470282556_112022-W.webp' 
  },
];

export const getParts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pcParts);
    }, 2000);
  });
};

export const getPartsByCategory = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pcParts.filter((part) => part.category === categoryId));
    }, 2000);
  });
};

export const getPartById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pcParts.find((part) => part.id === id));
    }, 2000);
  });
};