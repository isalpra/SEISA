const raiz = document.documentElement; // <html>
const botonTema = document.querySelector('#boton-tema');
// Al cargar: ¿eligió oscuro la última vez?
if (localStorage.getItem('tema') === 'oscuro') {
raiz.classList.add('dark');
}
botonTema.addEventListener('click', function () {
raiz.classList.toggle('dark');
const oscuro = raiz.classList.contains('dark');
localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro');
});