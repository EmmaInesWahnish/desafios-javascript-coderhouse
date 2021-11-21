// Se solicita ingresar un nombre
let nombre = prompt("Por favor ingrese su Nombre");
// Se valida la información ingresada
if (!nombre || nombre == '') {
    alert("Es obligtorio ingresar un nombre no nulo");
    throw "Se ha ingresado información inválida" 
} else {
    // si la información ingresada es valida se solicita un numero
    elNumero = prompt(nombre + " por favor ingrese un numero entre 25 y 50");
    // Se valida el número ingresado y se envían mensajes acordes a la información ingresada
    if (isNaN(elNumero) || Number(elNumero) < 25 || Number(elNumero) > 50) {
        alert(nombre + " , el numero ingresado no responde a lo solicitado");
        throw "Se ha ingresado un numero inválido o fuera del rango solicitado";
    } else {
        alert(nombre + " , muchas gracias por su colaboración, usted ingresó " + elNumero);
    }
}