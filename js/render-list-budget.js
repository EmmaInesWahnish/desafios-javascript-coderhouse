import { Coworker } from "./coworker.js";

let coworker = new Coworker;

export const renderListBudget = (taskId, tasks, letter) => {

    const $table = $("#" + taskId);

    let sendTable = [];

    let costoDelPlan = 0;

    sendTable = [];

    let i = 0;

    for (const item of tasks) {

        let colId = [];

        let theId = i.toString();

        theId = theId.trim();

        switch (theId.length) {
            case 1:
                theId = letter + "0" + theId;
                break;
            case 2:
                theId = letter + theId;
                break;
            default:
                alert("Id overflow***");
        }

        for (let j = 0; j < 5; j++) {

            colId[j] = theId + "C0" + j;

        }

        let idResponsable = item.assignedTo;
        if (idResponsable != '') {
            const colaborador = coworker.findCalByIdItem(idResponsable);
            const valorDia = colaborador.hoursPerDay * colaborador.valuePerHour;
            var costoDeLaTarea = item.workDays * valorDia;
            costoDelPlan = costoDelPlan + costoDeLaTarea;
        };

        sendTable.push({
            id: item.id,
            description: item.description,
            workDays: item.workDays,
            costo: costoDeLaTarea
        });

        //limpiar antes de volver a renderizar
        var $taskContainer = $("#b" + theId);

        $taskContainer.remove();

        i++;

        //renderizar
        $table.append(`<tr id=${theId}>
                                <td>
                                    <p id=${colId[0]}> 
                                        ${item.id} 
                                    </p>
                                </td>
                                <td>
                                    <p id= ${colId[1]}> 
                                        ${item.description} 
                                    </p>
                                </td>
                                <td>
                                    <p id=${colId[4]}> 
                                        ${item.workDays} 
                                    </p>
                                </td>
                                <td>
                                    <p id=${colId[5]}> 
                                        ${costoDeLaTarea} 
                                    </p>
                                </td>`)
    }

    return sendTable;
}
