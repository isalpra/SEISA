// ===== Productos de cuerda pulsada =====
const productos = [
  { nombre: 'Yamaha C40 guitarra clásica', precio: '149,00 €',
    fabricante: 'Yamaha', ancho: 37, altura: 98, profundidad: 10, peso: 1.7 },
  { nombre: 'Alhambra 4P guitarra flamenca', precio: '890,00 €',
    fabricante: 'Alhambra', ancho: 37, altura: 99, profundidad: 10, peso: 1.6 },
  { nombre: 'Yamaha FG800 guitarra acústica', precio: '229,00 €',
    fabricante: 'Yamaha', ancho: 40, altura: 105, profundidad: 12, peso: 2.1 },
  { nombre: 'Taylor 214ce guitarra electroacústica', precio: '1.199,00 €',
    fabricante: 'Taylor', ancho: 40, altura: 104, profundidad: 11, peso: 2 },
  { nombre: 'Fender Player Stratocaster', precio: '849,00 €',
    fabricante: 'Fender', ancho: 32, altura: 99, profundidad: 5, peso: 3.5 },
  { nombre: 'Gibson Les Paul Standard 60s', precio: '2.799,00 €',
    fabricante: 'Gibson', ancho: 33, altura: 100, profundidad: 5, peso: 4.2 },
  { nombre: 'Ibanez RG421 guitarra eléctrica', precio: '399,00 €',
    fabricante: 'Ibanez', ancho: 32, altura: 100, profundidad: 5, peso: 3.4 },
  { nombre: 'Fender Player Precision Bass', precio: '829,00 €',
    fabricante: 'Fender', ancho: 32, altura: 120, profundidad: 5, peso: 4.1 },
  { nombre: 'Yamaha TRBX304 bajo eléctrico', precio: '429,00 €',
    fabricante: 'Yamaha', ancho: 33, altura: 117, profundidad: 5, peso: 4 },
  { nombre: 'Ortega D-Tonic ukelele tenor', precio: '119,00 €',
    fabricante: 'Ortega', ancho: 19, altura: 66, profundidad: 7, peso: 0.5 },
  { nombre: 'Kala KA-15S ukelele soprano', precio: '79,00 €',
    fabricante: 'Kala', ancho: 18, altura: 53, profundidad: 7, peso: 0.4 },
  { nombre: 'Gibson Mastertone banjo de 5 cuerdas', precio: '2.300,00 €',
    fabricante: 'Gibson', ancho: 30, altura: 85, profundidad: 8, peso: 3.5 },
  { nombre: 'Laúd español de 12 cuerdas', precio: '780,00 €',
    fabricante: 'Artesanal', ancho: 30, altura: 85, profundidad: 15, peso: 1.8 },
  { nombre: 'Mandolina Eastman MD305', precio: '560,00 €',
    fabricante: 'Eastman', ancho: 26, altura: 65, profundidad: 8, peso: 1.2 },
  { nombre: 'Salvi Diana arpa de pedales', precio: '14.900,00 €',
    fabricante: 'Salvi', ancho: 105, altura: 170, profundidad: 55, peso: 38 }
];

// ===== Rutas automáticas de las fotos: 1, 2, 3... =====
const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

productos.forEach(function (producto, indice) {
  producto.base = 'media/img/pulsada/' + (indice + 1);
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

// ===== Elementos de la página =====
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

// ===== Crear la galería =====
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

// ===== Cerrar: botón ×, clic fuera o tecla Esc =====
fichaCerrar.addEventListener('click', function () {
  ficha.close();
});

ficha.addEventListener('click', function (evento) {
  if (evento.target === ficha) {
    ficha.close();
  }
});