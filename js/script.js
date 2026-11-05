// ===== Modo claro / oscuro =====
const raiz = document.documentElement; // <html>
const botonTema = document.querySelector('#boton-tema');

function actualizarBotonTema() {
  const oscuro = raiz.classList.contains('dark');
  if (botonTema) {
    botonTema.setAttribute('aria-pressed', oscuro);
    botonTema.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
}

// Al cargar: ¿eligió oscuro la última vez?
if (localStorage.getItem('tema') === 'oscuro') {
  raiz.classList.add('dark');
}
actualizarBotonTema();

if (botonTema) {
  botonTema.addEventListener('click', function () {
    raiz.classList.toggle('dark');
    localStorage.setItem('tema', raiz.classList.contains('dark') ? 'oscuro' : 'claro');
    actualizarBotonTema();
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

if (botonMenu && menu) {
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
}

// ===== AOS (animaciones al hacer scroll) =====
AOS.init();

// ===== Tarjetas apiladas con GSAP + ScrollTrigger =====
// Solo se ejecuta en index.html, donde existe la sección #categorias
if (document.querySelector('#categorias')) {
  gsap.registerPlugin(ScrollTrigger);

  const tarjetas = gsap.utils.toArray('.tarjeta-categoria');

  const PAUSA = 2;                  // tiempo con la tarjeta quieta antes de que entre la siguiente
  const TRANSICION = 1;             // tiempo que tarda en subir la siguiente
  const PANTALLAS_POR_UNIDAD = 0.6; // pantallas de scroll por cada unidad de tiempo

  // La 2ª y la 3ª empiezan fuera de pantalla, por debajo
  gsap.set(tarjetas.slice(1), { y: () => window.innerHeight });

  const lineaTiempo = gsap.timeline({ defaults: { ease: 'none' } });

  tarjetas.slice(1).forEach(function (tarjeta, i) {
    const inicio = i * (PAUSA + TRANSICION) + PAUSA;
    lineaTiempo
      .to(tarjetas[i], { scale: 0.94, duration: TRANSICION }, inicio)
      .to(tarjeta, { y: 0, duration: TRANSICION }, inicio);
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
}

// ===== Formulario de contacto =====
const formulario = document.querySelector('#formulario-contacto');
const estadoFormulario = document.querySelector('#estado-formulario');

if (formulario) {
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const nombre = formulario.nombre.value.trim();
    estadoFormulario.textContent = 'Gracias, ' + nombre + '. Hemos recibido tu mensaje.';
    formulario.reset();
  });
}

// ===== Música (Howler.js) =====
const musica = new Howl({
  src: ['media/audio/Stan - Eminem.mp3'],   // cambiad por vuestro audio libre de derechos
  loop: true,
  volume: 0.5,
  onloaderror: function () {
    console.error('No se pudo cargar el audio: revisa la ruta y el nombre del archivo.');
  }
});

const botonMusica = document.querySelector('#boton-musica');
const iconoPlay = document.querySelector('#icono-play');
const iconoPausa = document.querySelector('#icono-pausa');

let sonando = false;

function actualizarBotonMusica() {
  iconoPlay.classList.toggle('hidden', sonando);
  iconoPausa.classList.toggle('hidden', !sonando);
  botonMusica.classList.toggle('sonando', sonando);
  botonMusica.setAttribute('aria-pressed', sonando);
  botonMusica.setAttribute('aria-label', sonando ? 'Pausar música' : 'Reproducir música');
}

if (botonMusica) {
  // Al cargar la página: retomar donde se quedó
  const posicionGuardada = parseFloat(sessionStorage.getItem('musicaPosicion')) || 0;
  const estabaSonando = sessionStorage.getItem('musicaSonando') === 'true';

  if (posicionGuardada > 0) {
    musica.once('load', function () {
      musica.seek(posicionGuardada);
    });
  }
  if (estabaSonando) {
    musica.play();
    sonando = true;
    actualizarBotonMusica();
  }

  botonMusica.addEventListener('click', function () {
    if (sonando) {
      musica.pause();
    } else {
      musica.play();
    }
    sonando = !sonando;
    actualizarBotonMusica();
  });

  // Al salir de la página: guardar posición y estado
  window.addEventListener('pagehide', function () {
    sessionStorage.setItem('musicaPosicion', musica.seek());
    sessionStorage.setItem('musicaSonando', sonando);
  });
}