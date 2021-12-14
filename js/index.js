class Task {
    constructor() {
        this.lista = JSON.parse(localStorage.getItem('task')) || [];
    }

    createItem(item) {
        this.lista.push(item)
        localStorage.setItem('task', JSON.stringify(this.lista))
    }

    findAllItems() {
        return this.lista;
    }

    findOneByIdItem(itemId) {
        const item = this.lista.find(element => element.id === itemId)

        if (!item) {
            throw new Error('No existe la tarea id:' + itemId)
        }

        return item;
    }

    updateWorkDays(itemId, diasTrabajo) {
        if (Number(diasTrabajo) > 0) {
            const item = this.findOneByIdItem(itemId);
            const index = this.lista.indexOf(item);
            this.lista[index].workDays = diasTrabajo;
            localStorage.setItem('task', JSON.stringify(this.lista));
            let donde = "F0" + index + "C04";
            document.getElementById(donde).innerHTML = diasTrabajo
        }
    }

    updateCoworker(itemId, colaborador) {
        const item = this.findOneByIdItem(itemId);
        const index = this.lista.indexOf(item);
        this.lista[index].assignedTo = colaborador;
        localStorage.setItem('task', JSON.stringify(this.lista));
        let donde = "F0" + index + "C02";
        document.getElementById(donde).innerHTML = colaborador;
    }


    completeTask(itemId) {
        const item = this.findOneByIdItem(itemId);
        const index = this.lista.indexOf(item);
        this.lista[index].state = "Si";
        localStorage.setItem('task', JSON.stringify(this.lista));
        let estado = "F0" + index + "C03";
        document.getElementById(estado).innerHTML = "Si"
    }

    deleteItem(itemId) {
        const item = this.findOneByIdItem(itemId);
        if (item) {
            const index = this.lista.indexOf(item);
            this.lista.splice(index, 1);
            localStorage.setItem('task', JSON.stringify(this.lista));
        }
    }

    tasksPercentCompletion() {
        let total = 0;
        let totalDias = 0;
        this.lista.forEach(element => {
            if (element.state === "Si") {
                total = total + Number(element.workDays);
            }
            totalDias = totalDias + Number(element.workDays);
        });
        let percent = (100 * Number(total)) / Number(totalDias);
        return percent;
    }
}

class Coworker {
    constructor() {
        this.lista = JSON.parse(localStorage.getItem('coworker')) || [];
    }

    createItem(item) {
        this.lista.push(item)
        localStorage.setItem('coworker', JSON.stringify(this.lista))
    }

    findAllItems() {
        return this.lista;
    }

    findOneByIdItem(itemId) {
        const item = this.lista.find(element => element.id === itemId)

        if (!item) {
            throw new Error('No existe la tarea id:' + itemId)
        }

        return item;
    }

    updateValuePerHour(itemId, valorHora) {
        if (Number(diasTrabajo) > 0) {
            const item = this.findOneByIdItem(itemId);
            const index = this.lista.indexOf(item);
            this.lista[index].valuePerHour = valorHora;
            localStorage.setItem('coworker', JSON.stringify(this.lista))
        }
    }

    updateHoursPerDay(itemId, valorHora) {
        if (Number(diasTrabajo) > 0) {
            const item = this.findOneByIdItem(itemId);
            const index = this.lista.indexOf(item);
            this.lista[index].valuePerHour = valorHora;
            localStorage.setItem('coworker', JSON.stringify(this.lista))
        }
    }

    deleteItem(itemId) {
        const item = this.findOneByIdItem(itemId);
        if (item) {
            const index = this.lista.indexOf(item);
            this.lista.splice(index, 1);
            localStorage.setItem('coworker', JSON.stringify(this.lista));
        }
    }

    getValuePerDay() {
        return this.hoursPerDay * this.valuePerHour;
    }
}


const renderList = (taskId, tasks) => {

    const tasksContainer = document.getElementById(taskId)

    let i = 0;

    for (const item of tasks) {

        let colId = [];

        let theId = i.toString();

        theId = theId.trim();

        switch (theId.length) {
            case 1:
                theId = "F0" + theId;
                break;
            case 2:
                theId = "F" + theId;
                break;
            default:
                alert("Id overflow***");
        }

        for (j = 0; j < 5; j++) {

            colId[j] = theId + "C0" + j;

        }

        i++;

        const itemTask = document.createElement('tr');

        itemTask.innerHTML = `<td>
                                    <p id=${colId[0]}> 
                                        ${item.id} 
                                    </p>
                                <td>
                                    <p id= ${colId[1]}> 
                                        ${item.description} 
                                    </p>
                                </td>
                                <td>
                                    <p id=${colId[2]}> 
                                        ${item.assignedTo} 
                                    </p>
                                </td>
                                <td>
                                    <p id=${colId[3]}> 
                                        ${item.state} 
                                    </p>
                                <td>
                                    <p id=${colId[4]}> 
                                        ${item.workDays} 
                                    </p>
                                </td>`

        tasksContainer.appendChild(itemTask)
    }

}

function percentComplete() {

    resultado = Number(task.tasksPercentCompletion()) + " %";
    document.getElementById("avance").innerHTML = resultado;
}

function calculateCost() {
    let costoDelPlan = 0;
    tareas.forEach(element => {
        let idResponsable = element.assignedTo;
        if (idResponsable != '') {
            const colaborador = coworker.findOneByIdItem(idResponsable);
            const valorDia = colaborador.hoursPerDay * colaborador.valuePerHour;
            costoDelPlan = costoDelPlan + element.workDays * valorDia;
        }
    });
    resultado = "U$S " + costoDelPlan;
    document.getElementById("costo").innerHTML = resultado;
}

function changeTaskStatus() {
    let anotherTask = "S";
    do {
        theTask = '';
        while (!theTask || Number(theTask) || theTask == '') {
            theTask = prompt("Ingrese Id de tarea a marcar como finalizada")
        }
        task.completeTask(theTask);
        anotherTask = prompt("Ingrese la letra N cuando no desee finalizar mas tareas");

    } while (anotherTask != "N");

}

function modifyPlan() {
    let anotherTask = "S";
    do {
        theTask = '';
        while (!theTask || Number(theTask) || theTask == '') {
            theTask = prompt("Ingrese Id de tarea a modificar")
        }
        let dias = +prompt("Por favor ingrese la cantidad de dias trabajados");
        while (!dias || Number(dias) < 0) {
            alert("La cantidad de días debe ser un numero positivo");
            dias = prompt("Por favor ingrese la cantidad de dias trabajados");
        }
        task.updateWorkDays(theTask, dias)
        anotherTask = prompt("Ingrese la letra N cuando no desee modificar mas tareas");

    } while (anotherTask != "N");

}

function modifyCoworker() {
    let anotherTask = "S";
    do {
        theTask = '';
        while (!theTask || Number(theTask) || theTask == '') {
            theTask = prompt("Ingrese Id de tarea a modificar")
        }

        let idColaborador = prompt("Por favor ingrese el Id del responsable asignado");
        while (!idColaborador || Number(idColaborador) || idColaborador == '') {
            alert("Es obligtorio ingresar un Id no nulo");
            idColaborador = prompt("Por favor ingrese el Id del responsable asignado");
        }

        task.updateCoworker(theTask, idColaborador);
        anotherTask = prompt("Ingrese la letra N cuando no desee modificar mas tareas");

    } while (anotherTask != "N");

}

function listCoworkers() {

    let theCoworker = "";
    const coworkers = coworker.findAllItems();
    coworkers.forEach(element => {
        theCoworker += `Id ${element.id}: ${element.firstname} ${element.surname} Valor hora ${element.valuePerHour} Cantidad de horas diarias ${element.hoursPerDay}\n`;
    })
    alert(theCoworker);
}

function newCoworker() {
    const coworkers = coworker.findAllItems();
    let i = coworkers.length;
    console.log(i);
    let theId = i.toString();
    theId = theId.trim();
    switch (theId.length) {
        case 1:
            theId = "W00" + theId;
            break;
        case 2:
            theId = "W0" + theId;
            break;
        case 3:
            theId = "W" + theId;
            break;
        default:
            alert("Id overflow***");
    }
    id = theId;
    surname = prompt("Ingrese el Apellido del colaborador");
    // Se valida la información ingresada
    while (!surname || Number(surname) || surname == '') {
        alert("Es obligtorio ingresar un apellido no nulo");
        surname = prompt("Ingrese el Apellido del colaborador");
    }
    firstname = prompt("Ingrese el Nombre del colaborador");
    // Se valida la información ingresada
    while (!firstname || Number(firstname) || firstname == '') {
        alert("Es obligtorio ingresar un nombre no nulo");
        firstname = prompt("Ingrese el Nombre del colaborador");
    }
    // Se asume que se pacto un valor hora de 15 U$S
    valuePerHour = 15;
    // Se asume que se trabajan 6 horas diarias
    hoursPerDay = 6;

    const colaboradorNuevo = {id: id, surname: surname, firstname: firstname, valuePerHour: valuePerHour, hoursPerDay: hoursPerDay };
    
    coworker.createItem(colaboradorNuevo);

}

//modulo
localStorage.clear();

const tareas = [
    { id: "T000", description: "Relevamiento de requerimientos", assignedTo: "W000", state: "No", workDays: 2, tagname: "F00" },
    { id: "T001", description: "Diagrama de funcionalidad", assignedTo: "W001", state: "No", workDays: 5, tagname: "F01" },
    { id: "T002", description: "Validacion del diagrama", assignedTo: "W000", state: "No", workDays: 1, tagname: "F02" },
    { id: "T003", description: "Desarrollo de la aplicacion", assignedTo: "W003", state: "No", workDays: 15, tagname: "F03" },
    { id: "T004", description: "Testing de la aplicacion", assignedTo: "W002", state: "No", workDays: 5, tagname: "F04" },
    { id: "T005", description: "Puesta en produccion", assignedTo: "W001", state: "No", workDays: 2, tagname: "F05" },
]

const colaboradores = [
    { id: "W000", surname: "Figueroa", firstname: "Hernan", valuePerHour: 20, hoursPerDay: 4 },
    { id: "W001", surname: "Arias", firstname: "Eduardo", valuePerHour: 18, hoursPerDay: 5 },
    { id: "W002", surname: "Perez", firstname: "Valeria", valuePerHour: 22, hoursPerDay: 6 },
    { id: "W003", surname: "Rodriguez", firstname: "Fernando", valuePerHour: 19, hoursPerDay: 6 },
    { id: "W004", surname: "Zucker", firstname: "Patricia", valuePerHour: 20, hoursPerDay: 5 },
    { id: "W005", surname: "Wella", firstname: "German", valuePerHour: 20, hoursPerDay: 5 },
]

const task = new Task();

for (elem of tareas) {
    task.createItem(elem);
}

const tasks = task.findAllItems();

const tasksTable = "tasks-table"

renderList(tasksTable, tasks);

const coworker = new Coworker;

for (elem of colaboradores) {
    coworker.createItem(elem);
}



