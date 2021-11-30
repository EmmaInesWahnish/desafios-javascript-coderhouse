let tareas = prompt("Ingrese la cantidad total de tareas del plan");
//Se valida la información ingresada
if (isNaN(tareas) || Number(tareas) <= 0) {
    alert("Es obligatorio ingresar un numero entero positivo");
    throw "No se ha ingresado un numero entero positivo";
} else {
    // si se ha ingresado un entero positivo se solicita el ingreso de la cantidad de tareas finalizadas
    let finalizadas = prompt("Ingrese el numero de tareas finalizadas");
    // se valida la información ingresada 
    if (isNaN(finalizadas) || Number(finalizadas) <=0 || Number(finalizadas) > Number(tareas)){
        alert("La cantidad de tareas finalizadas debe ser un numero entero positivo menor o igual a la cantidad total de tareas");
        throw "No se ha ingresado un numero entero menor o igual a la cantidad total de tareas";
    } else {
        // si la información ingresada es válida se calcula e informa el porcentaje de avance del plan
        let porcentaje = (100 * Number(finalizadas)) / Number(tareas);
        alert("El porcentaje de avance del plan es del " + porcentaje + " %");
    }
}      
