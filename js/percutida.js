
const productos = [
  { nombre: 'Yamaha PU1QPE piano negro', precio: '11.549,93 €',
    fabricante: 'Yamaha', ancho: 153, altura: 121, profundidad: 62, peso: 228 },
  { nombre: 'Yamaha U3 piano vertical', precio: '15.990,00 €',
    fabricante: 'Yamaha', ancho: 153, altura: 131, profundidad: 65, peso: 245 },
  { nombre: 'Kawai K-300 piano vertical', precio: '8.490,00 €',
    fabricante: 'Kawai', ancho: 153, altura: 122, profundidad: 61, peso: 223 },
  { nombre: 'Schimmel K 125 piano vertical', precio: '9.900,00 €',
    fabricante: 'Schimmel', ancho: 153, altura: 125, profundidad: 61, peso: 230 },
  { nombre: 'Petrof P 118 D1 pianino', precio: '7.200,00 €',
    fabricante: 'Petrof', ancho: 149, altura: 118, profundidad: 59, peso: 207 },
  { nombre: 'Kawai GL-10 piano de cola', precio: '17.900,00 €',
    fabricante: 'Kawai', ancho: 150, altura: 100, profundidad: 153, peso: 260 },
  { nombre: 'Yamaha C3X piano de cola', precio: '36.900,00 €',
    fabricante: 'Yamaha', ancho: 149, altura: 102, profundidad: 186, peso: 320 },
  { nombre: 'Steinway & Sons S-155 piano de cola', precio: '79.500,00 €',
    fabricante: 'Steinway & Sons', ancho: 149, altura: 102, profundidad: 155, peso: 286 },
  { nombre: 'Yamaha CLP-745 piano digital', precio: '1.899,00 €',
    fabricante: 'Yamaha', ancho: 136, altura: 83, profundidad: 42, peso: 42 },
  { nombre: 'Kawai CA99 piano digital', precio: '5.990,00 €',
    fabricante: 'Kawai', ancho: 146, altura: 91, profundidad: 46, peso: 78 },
  { nombre: 'Roland FP-30X piano de escenario', precio: '799,00 €',
    fabricante: 'Roland', ancho: 130, altura: 14, profundidad: 28, peso: 14 },
  { nombre: 'Nord Piano 5 88 teclas', precio: '3.790,00 €',
    fabricante: 'Nord', ancho: 129, altura: 12, profundidad: 33, peso: 18 },
  { nombre: 'Casio Privia PX-S1100', precio: '649,00 €',
    fabricante: 'Casio', ancho: 132, altura: 23, profundidad: 23, peso: 11 },
  { nombre: 'Clavicordio de estudio', precio: '2.800,00 €',
    fabricante: 'Neupert', ancho: 120, altura: 25, profundidad: 40, peso: 18 },
  { nombre: 'Dulcémele de martillo', precio: '1.250,00 €',
    fabricante: 'Dusty Strings', ancho: 90, altura: 12, profundidad: 40, peso: 6 }
];


const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

productos.forEach(function (producto, indice) {
  producto.base = 'media/img/percutida/' + (indice + 1);
  producto.imagen = producto.base + '.' + EXTENSIONES[0];
});


function probarSiguienteExtension(img, producto, intento) {
  intento++;
  if (intento < EXTENSIONES.length) {
    img.dataset.intento = intento;
    producto.imagen = producto.base + '.' + EXTENSIONES[intento];
    img.src = producto.imagen;
  }
}


const galeria = document.querySelector('#galeria');
const ficha = document.querySelector('#ficha');
const fichaNombre = document.querySelector('#ficha-nombre');
const fichaImagen = document.querySelector('#ficha-imagen');
const fichaPrecio = document.querySelector('#ficha-precio');
const fichaDatos = document.querySelector('#ficha-datos');
const fichaCerrar = document.querySelector('#ficha-cerrar');


const caracteristicas = [
  ['fabricante', 'Fabricante', ''],
  ['ancho', 'Ancho', ' cm'],
  ['altura', 'Altura', ' cm'],
  ['profundidad', 'Profundidad', ' cm'],
  ['peso', 'Peso', ' kg']
];


productos.forEach(function (producto, indice) {
  const li = document.createElement('li');

  
  li.className = 'min-h-0' +
    (indice === productos.length - 1 && productos.length % 2 !== 0
      ? ' col-span-2 md:col-span-1 [&>button]:aspect-[2/1] md:[&>button]:aspect-auto'
      : '');

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.dataset.indice = indice;
  boton.className =
    'group relative block aspect-square h-full w-full overflow-hidden rounded-xl bg-texto/10 md:aspect-auto ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento';

  const img = document.createElement('img');
  img.src = producto.imagen;
  img.alt = producto.nombre;
  img.loading = 'lazy';
  img.dataset.intento = 0;
  img.className =
    'h-full w-full object-cover transition duration-500 group-hover:scale-110 group-focus-visible:scale-110';
  
  img.addEventListener('error', function () {
    probarSiguienteExtension(img, producto, Number(img.dataset.intento));
  });

  const nombre = document.createElement('span');
  nombre.textContent = producto.nombre;
  nombre.className =
    'absolute inset-x-0 bottom-0 bg-linear-to-t from-fondo to-transparent p-2 text-left ' +
    'font-texto text-xs text-texto transition duration-300 ' +
    'md:translate-y-full md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0';

  boton.appendChild(img);
  boton.appendChild(nombre);
  li.appendChild(boton);
  galeria.appendChild(li);
});

// ===== Abrir la ficha =====
function abrirFicha(indice) {
  const p = productos[indice];
  fichaNombre.textContent = p.nombre;
  fichaImagen.src = p.imagen;  
  fichaImagen.alt = p.nombre;
  fichaPrecio.textContent = p.precio;

  fichaDatos.innerHTML = '';
  caracteristicas.forEach(function (c) {
    const bloque = document.createElement('div');
    const dt = document.createElement('dt');
    dt.className = 'text-sm opacity-70';
    dt.textContent = c[1];
    const dd = document.createElement('dd');
    dd.className = 'font-semibold';
    dd.textContent = p[c[0]] + c[2];
    bloque.appendChild(dt);
    bloque.appendChild(dd);
    fichaDatos.appendChild(bloque);
  });

  ficha.showModal();
}

galeria.addEventListener('click', function (evento) {
  const boton = evento.target.closest('button[data-indice]');
  if (boton) {
    abrirFicha(Number(boton.dataset.indice));
  }
});

// ===== Cerrar: botón ×, clic fuera de la ficha  =====
fichaCerrar.addEventListener('click', function () {
  ficha.close();
});

ficha.addEventListener('click', function (evento) {
  if (evento.target === ficha) {
    ficha.close();
  }
});