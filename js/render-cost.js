//bloque para calcular el avance del plan
export const calculateCost = (task, coworker) => {
    //bloque para calcular costo del plan
    const $costo = $('#calculateCost')
    let costoDelPlan = 0;
    let tasks = task.findAllItems();
    tasks.forEach(element => {
        let idResponsable = element.assignedTo;
        if (idResponsable != '') {
            const colaborador = coworker.findCalByIdItem(idResponsable);
            const valorDia = colaborador.hoursPerDay * colaborador.valuePerHour;
            costoDelPlan = costoDelPlan + element.workDays * valorDia;
        }
    });
    let resultado = "U$S " + costoDelPlan;
    $('#plan_cost').empty();
    $('#plan_cost').append(resultado);
    console.log(resultado);
    //fin bloque para calcular costo del plan
}
