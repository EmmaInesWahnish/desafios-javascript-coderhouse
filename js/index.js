let nombre = '';
nombre = prompt('Ingrese su nombre por favor');
if (!nombre || nombre == '' || nombre !== 'EMMA') {
    alert('Credenciales inválidas');
    alert(nombre);
} else {
    alert('Hola ' + nombre);
}