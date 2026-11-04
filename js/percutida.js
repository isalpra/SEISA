// ===== Productos de cuerda percutida =====
const productos = [
  { nombre: 'Yamaha PU1QPE piano negro', precio: '11.549,93 €', imagen: 'img/percutida/yamaha-pu1qpe.jpg',
    fabricante: 'Yamaha', ancho: 153, altura: 121, profundidad: 62, peso: 228 },
  { nombre: 'Yamaha U3 piano vertical', precio: '15.990,00 €', imagen: 'img/percutida/yamaha-u3.jpg',
    fabricante: 'Yamaha', ancho: 153, altura: 131, profundidad: 65, peso: 245 },
  { nombre: 'Kawai K-300 piano vertical', precio: '8.490,00 €', imagen: 'img/percutida/kawai-k300.jpg',
    fabricante: 'Kawai', ancho: 153, altura: 122, profundidad: 61, peso: 223 },
  { nombre: 'Schimmel K 125 piano vertical', precio: '9.900,00 €', imagen: 'img/percutida/schimmel-k125.jpg',
    fabricante: 'Schimmel', ancho: 153, altura: 125, profundidad: 61, peso: 230 },
  { nombre: 'Petrof P 118 D1 pianino', precio: '7.200,00 €', imagen: 'img/percutida/petrof-p118.jpg',
    fabricante: 'Petrof', ancho: 149, altura: 118, profundidad: 59, peso: 207 },
  { nombre: 'Kawai GL-10 piano de cola', precio: '17.900,00 €', imagen: 'img/percutida/kawai-gl10.jpg',
    fabricante: 'Kawai', ancho: 150, altura: 100, profundidad: 153, peso: 260 },
  { nombre: 'Yamaha C3X piano de cola', precio: '36.900,00 €', imagen: 'img/percutida/yamaha-c3x.jpg',
    fabricante: 'Yamaha', ancho: 149, altura: 102, profundidad: 186, peso: 320 },
  { nombre: 'Steinway & Sons S-155 piano de cola', precio: '79.500,00 €', imagen: 'img/percutida/steinway-s155.jpg',
    fabricante: 'Steinway & Sons', ancho: 149, altura: 102, profundidad: 155, peso: 286 },
  { nombre: 'Yamaha CLP-745 piano digital', precio: '1.899,00 €', imagen: 'img/percutida/yamaha-clp745.jpg',
    fabricante: 'Yamaha', ancho: 136, altura: 83, profundidad: 42, peso: 42 },
  { nombre: 'Kawai CA99 piano digital', precio: '5.990,00 €', imagen: 'img/percutida/kawai-ca99.jpg',
    fabricante: 'Kawai', ancho: 146, altura: 91, profundidad: 46, peso: 78 },
  { nombre: 'Roland FP-30X piano de escenario', precio: '799,00 €', imagen: 'img/percutida/roland-fp30x.jpg',
    fabricante: 'Roland', ancho: 130, altura: 14, profundidad: 28, peso: 14 },
  { nombre: 'Nord Piano 5 88 teclas', precio: '3.790,00 €', imagen: 'img/percutida/nord-piano5.jpg',
    fabricante: 'Nord', ancho: 129, altura: 12, profundidad: 33, peso: 18 },
  { nombre: 'Casio Privia PX-S1100', precio: '649,00 €', imagen: 'img/percutida/casio-pxs1100.jpg',
    fabricante: 'Casio', ancho: 132, altura: 23, profundidad: 23, peso: 11 },
  { nombre: 'Clavicordio de estudio', precio: '2.800,00 €', imagen: 'img/percutida/clavicordio.jpg',
    fabricante: 'Neupert', ancho: 120, altura: 25, profundidad: 40, peso: 18 },
  { nombre: 'Dulcémele de martillo', precio: '1.250,00 €', imagen: 'img/percutida/dulcemele.jpg',
    fabricante: 'Dusty Strings', ancho: 90, altura: 12, profundidad: 40, peso: 6 }
];

const galeria = document.querySelector('#galeria');
const ficha = document.querySelector('#ficha');
const fichaNombre = document.querySelector('#ficha-nombre');
const fichaImagen = document.querySelector('#ficha-imagen');
const fichaPrecio = document.querySelector('#ficha-precio');
const fichaDatos = document.querySelector('#ficha-datos');
const fichaCerrar = document.querySelector('#ficha-cerrar');

// Etiquetas y unidades de las características
const caracteristicas = [
  ['fabricante', 'Fabricante', ''],
  ['ancho', 'Ancho', ' cm'],
  ['altura', 'Altura', ' cm'],
  ['profundidad', 'Profundidad', ' cm'],
  ['peso', 'Peso', ' kg']
];

// ----- Crear la galería -----
productos.forEach(function (producto, indice) {
  const li = document.createElement('li');
  // Si el total es impar, la última foto ocupa las 2 columnas en móvil
li.className = 'min-h-0' +
  (indice === productos.length - 1 && productos.length % 2 !== 0
    ? ' col-span-2 md:col-span-1'
    : '');
  li.innerHTML =
    '<button type="button" data-indice="' + indice + '" ' +
      'class="group relative block aspect-square h-full w-full overflow-hidden rounded-xl bg-texto/10 md:aspect-auto ' +
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento">' +
      '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" loading="lazy" ' +
        'class="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-focus-visible:scale-110">' +
      '<span class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-2 text-left ' +
        'font-texto text-xs text-white transition duration-300 ' +
        'md:translate-y-full md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0">' +
        producto.nombre +
      '</span>' +
    '</button>';
  galeria.appendChild(li);
});

// ----- Abrir la ficha -----
function abrirFicha(indice) {
  const p = productos[indice];
  fichaNombre.textContent = p.nombre;
  fichaImagen.src = p.imagen;
  fichaImagen.alt = p.nombre;
  fichaPrecio.textContent = p.precio;

  fichaDatos.innerHTML = '';
  caracteristicas.forEach(function (c) {
    const bloque = document.createElement('div');
    bloque.innerHTML =
      '<dt class="text-sm opacity-70">' + c[1] + '</dt>' +
      '<dd class="font-semibold">' + p[c[0]] + c[2] + '</dd>';
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

// ----- Cerrar: botón ×, clic fuera de la ficha, o tecla Esc (nativa) -----
fichaCerrar.addEventListener('click', function () {
  ficha.close();
});

ficha.addEventListener('click', function (evento) {
  if (evento.target === ficha) {
    ficha.close();
  }
});