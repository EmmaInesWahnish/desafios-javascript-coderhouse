function percentComplete() {
    let total = 0;
    let totalDias = 0;
    let  cantidadTotalTareas = 6;
    for (i=0; i < cantidadTotalTareas; i++) {
        let estado = "F0" + i + "C03";
        let losDias = "F0" + i + "C04"
        if (document.getElementById(estado).innerHTML === "Si") {
            total = total + Number(document.getElementById(losDias).innerHTML);
        }
        totalDias = totalDias + Number(document.getElementById(losDias).innerHTML);
    }
    let porcentaje = (100 * Number(total)) / Number(totalDias);
    alert("El porcentaje de avance del plan es del " + porcentaje + " %");
    resultado = porcentaje + " %";
    document.getElementById("avance").innerHTML = resultado;
}    

