let nombre = '';
nombre = prompt('Ingrese su nombre por favor');
if (!nombre || nombre == '' || nombre.toUpperCase() !== 'EMMA') {
    alert('Credenciales inválidas');
} else {
    alert('Hola ' + nombre);
}