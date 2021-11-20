let nombre = '';
nombre = prompt('Ingrese su nombre por favor');
if (!nombre || nombre == '' || nombre !== 'EMMA') {
    alert('Credenciales inválidas');
} else {
    alert('Hola ' + nombre);
}