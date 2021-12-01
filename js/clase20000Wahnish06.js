function percentComplete() {
    let tareasFinalizadas = 0;
    let  cantidadTotalTareas = 6;
    for (i=0; i < cantidadTotalTareas; i++) {
        let estado = "F0" + i + "C03";
        if (document.getElementById(estado).innerHTML === "Si") {
            tareasFinalizadas++;
        }
    }
    let porcentaje = (100 * Number(tareasFinalizadas)) / Number(cantidadTotalTareas);
    alert("El porcentaje de avance del plan es del " + porcentaje + " %");
    resultado = porcentaje + " %";
    document.getElementById("avance").innerHTML = resultado;
}    

