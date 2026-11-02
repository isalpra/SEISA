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

const PAUSA = 2;             
const TRANSICION = 1;         
const PANTALLAS_POR_UNIDAD = 0.6; 

gsap.set(tarjetas.slice(1), { yPercent: 100 });

const lineaTiempo = gsap.timeline({ defaults: { ease: 'none' } });

tarjetas.slice(1).forEach(function (tarjeta, i) {
  const inicio = i * (PAUSA + TRANSICION) + PAUSA;
  lineaTiempo
    .to(tarjetas[i], { scale: 0.94, duration: TRANSICION }, inicio)
    .to(tarjeta, { yPercent: 0, duration: TRANSICION }, inicio);
});

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
  src: ['media/audio/Stan - Eminem.mp3'],
  loop: true,
  volume: 0.5
});

const botonMusica = document.querySelector('#boton-musica');
const iconoPlay = document.querySelector('#icono-play');
const iconoPausa = document.querySelector('#icono-pausa');

if (botonMusica) {
  botonMusica.addEventListener('click', function () {
    const sonando = musica.playing();
    if (sonando) {
      musica.pause();
    } else {
      musica.play();
    }
    const ahoraSuena = !sonando;
    iconoPlay.classList.toggle('hidden', ahoraSuena);
    iconoPausa.classList.toggle('hidden', !ahoraSuena);
    botonMusica.classList.toggle('sonando', ahoraSuena);
    botonMusica.setAttribute('aria-pressed', ahoraSuena);
    botonMusica.setAttribute('aria-label', ahoraSuena ? 'Pausar música' : 'Reproducir música');
  });
}