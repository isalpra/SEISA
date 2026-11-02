// ===== Modo claro / oscuro =====
const raiz = document.documentElement; // <html>
const botonTema = document.querySelector('#boton-tema');

// Al cargar: ¿eligió oscuro la última vez?
if (localStorage.getItem('tema') === 'oscuro') {
  raiz.classList.add('dark');
}

// Protegido: si el botón no existe todavía, no rompe el resto del script
if (botonTema) {
  botonTema.addEventListener('click', function () {
    raiz.classList.toggle('dark');
    const oscuro = raiz.classList.contains('dark');
    localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro');
  });
}

// ===== Menú móvil =====
const botonMenu = document.querySelector('#boton-menu');
const menu = document.querySelector('#menu-principal');

function alternarMenu(abrir) {
  if (abrir) {
    menu.classList.remove('cerrando');
    menu.classList.remove('hidden');
    menu.classList.add('flex');
  } else if (!menu.classList.contains('hidden')) {
    // No se oculta aún: primero se reproduce la animación de salida
    menu.classList.add('cerrando');
  }
  botonMenu.setAttribute('aria-expanded', abrir);
  botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
}

botonMenu.addEventListener('click', function () {
  alternarMenu(botonMenu.getAttribute('aria-expanded') !== 'true');
});

// Cuando termina la animación de salida, se oculta de verdad
menu.addEventListener('animationend', function (evento) {
  if (evento.animationName === 'plegar') {
    menu.classList.remove('cerrando');
    menu.classList.remove('flex');
    menu.classList.add('hidden');
  }
});

// Al pulsar un enlace en móvil, se cierra el menú
menu.querySelectorAll('a').forEach(function (enlace) {
  enlace.addEventListener('click', function () {
    alternarMenu(false);
  });
});

// ===== AOS (animaciones al hacer scroll) =====
AOS.init();



// ===== Tarjetas apiladas con GSAP + ScrollTrigger =====
gsap.registerPlugin(ScrollTrigger);

const tarjetas = gsap.utils.toArray('.tarjeta-categoria');

const PAUSA = 2;              // tiempo con la tarjeta quieta antes de que entre la siguiente
const TRANSICION = 1;         // tiempo que tarda en subir la siguiente
const PANTALLAS_POR_UNIDAD = 0.6; // pantallas de scroll por cada unidad de tiempo

// La 2ª y la 3ª empiezan fuera de pantalla, por debajo
gsap.set(tarjetas.slice(1), { yPercent: 100 });

const lineaTiempo = gsap.timeline({ defaults: { ease: 'none' } });

tarjetas.slice(1).forEach(function (tarjeta, i) {
  const inicio = i * (PAUSA + TRANSICION) + PAUSA;
  lineaTiempo
    .to(tarjetas[i], { scale: 0.94, duration: TRANSICION }, inicio)
    .to(tarjeta, { yPercent: 0, duration: TRANSICION }, inicio);
});

// Pausa final para ver la última tarjeta antes de soltar el pin
lineaTiempo.to({}, { duration: PAUSA });

ScrollTrigger.create({
  animation: lineaTiempo,
  trigger: '#categorias',
  start: 'top top',
  end: () => '+=' + window.innerHeight * PANTALLAS_POR_UNIDAD * lineaTiempo.duration(),
  pin: true,
  scrub: 0.6,
  invalidateOnRefresh: true
});