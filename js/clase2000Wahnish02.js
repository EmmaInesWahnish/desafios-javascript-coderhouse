let nombre = prompt("Por favor ingrese su Nombre");
if (!nombre || nombre == '') {
    alert("Es obligtorio ingresar un nombre no nulo");
    throw "Se ha ingresado información inválida" 
} else {
    elNumero = prompt(nombre + " por favor ingrese un numero entre 25 y 50");
    if (isNaN(elNumero) || Number(elNumero) < 25 || Number(elNumero) > 50) {
        alert(nombre + " , el numero ingresado no responde a lo solocitado");
        throw "Se ha ingresado un numero fuera de rango";
    } else {
        alert(nombre + " , muchas gracias por su colaboración");
    }
}