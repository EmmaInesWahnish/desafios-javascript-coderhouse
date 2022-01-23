//bloque para calcular el avance del plan
export const percentComplete = (task) => {
    const $porcentaje = $('#percentComplete')
    let resultado = Math.round(Number(task.tasksPercentCompletion())) + " %";
    $('#avance').empty();
    $("#avance").append(resultado);
}
//Fin bloque para calcular el avance del plan
