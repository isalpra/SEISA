// ===== Productos de cuerda frotada =====
const productos = [
  { nombre: 'Stentor Student II violín 4/4', precio: '189,00 €',
    fabricante: 'Stentor', ancho: 20, altura: 59, profundidad: 11, peso: 0.5 },
  { nombre: 'Yamaha V5SA violín 4/4', precio: '420,00 €',
    fabricante: 'Yamaha', ancho: 20, altura: 59, profundidad: 11, peso: 0.5 },
  { nombre: 'Cremona SV-175 violín 4/4', precio: '329,00 €',
    fabricante: 'Cremona', ancho: 20, altura: 59, profundidad: 11, peso: 0.5 },
  { nombre: 'Yamaha YEV104 violín eléctrico', precio: '1.099,00 €',
    fabricante: 'Yamaha', ancho: 22, altura: 60, profundidad: 11, peso: 0.7 },
  { nombre: 'Stentor Student I viola 40,5 cm', precio: '259,00 €',
    fabricante: 'Stentor', ancho: 23, altura: 67, profundidad: 12, peso: 0.7 },
  { nombre: 'Eastman VA100 viola', precio: '690,00 €',
    fabricante: 'Eastman', ancho: 23, altura: 67, profundidad: 12, peso: 0.7 },
  { nombre: 'Stentor Student II violonchelo 4/4', precio: '790,00 €',
    fabricante: 'Stentor', ancho: 35, altura: 123, profundidad: 20, peso: 3.5 },
  { nombre: 'Yamaha VC5S violonchelo', precio: '1.690,00 €',
    fabricante: 'Yamaha', ancho: 35, altura: 123, profundidad: 20, peso: 3.5 },
  { nombre: 'Yamaha SVC-210 violonchelo silencioso', precio: '1.790,00 €',
    fabricante: 'Yamaha', ancho: 38, altura: 118, profundidad: 25, peso: 3.3 },
  { nombre: 'Stentor Student I contrabajo 3/4', precio: '1.690,00 €',
    fabricante: 'Stentor', ancho: 56, altura: 180, profundidad: 25, peso: 10 },
  { nombre: 'Eastman VB80 contrabajo 3/4', precio: '3.290,00 €',
    fabricante: 'Eastman', ancho: 56, altura: 180, profundidad: 26, peso: 11 },
  { nombre: 'Viola da gamba tenor', precio: '2.400,00 €',
    fabricante: 'Artesanal', ancho: 28, altura: 105, profundidad: 15, peso: 2.5 },
  { nombre: 'Erhu tradicional', precio: '180,00 €',
    fabricante: 'Dunhuang', ancho: 9, altura: 81, profundidad: 9, peso: 1 },
  { nombre: 'Nyckelharpa sueca', precio: '3.200,00 €',
    fabricante: 'Artesanal', ancho: 25, altura: 100, profundidad: 10, peso: 3 },
  { nombre: 'Zanfona de 6 cuerdas', precio: '1.450,00 €',
    fabricante: 'Artesanal', ancho: 30, altura: 65, profundidad: 18, peso: 4 }
];

// ===== Rutas automáticas de las fotos: 1, 2, 3... =====
const EXTENSIONES = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

productos.forEach(function (producto, indice) {
  producto.base = 'media/img/frotada/' + (indice + 1);
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