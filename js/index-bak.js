import { Task } from "./task.js";

import { Coworker } from "./coworker.js";

import { renderList } from "./render-list.js";

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

let element = {};

let elem = {};

for (element of tareas) {
    task.createItem(element);
}

const tasks = task.findAllItems();

const tasksTable = "tasks-table"

renderList(tasksTable, tasks);

const coworker = new Coworker;

for (elem of colaboradores) {
    coworker.createItem(elem);
}

const porcentaje = document.getElementById('percentComplete')

porcentaje.addEventListener('click', function () {
    let resultado = Number(task.tasksPercentCompletion()) + " %";
    document.getElementById("avance").innerHTML = resultado;
})

const costo = document.getElementById('calculateCost')

costo.addEventListener('click', function () {
    let costoDelPlan = 0;
    tareas.forEach(element => {
        let idResponsable = element.assignedTo;
        if (idResponsable != '') {
            const colaborador = coworker.findCalByIdItem(idResponsable);
            const valorDia = colaborador.hoursPerDay * colaborador.valuePerHour;
            costoDelPlan = costoDelPlan + element.workDays * valorDia;
        }
    });
    let resultado = "U$S " + costoDelPlan;
    document.getElementById("costo").innerHTML = resultado;
});

const status_tarea = document.getElementById('changeTaskStatus');

status_tarea.addEventListener('click', function () {
    let anotherTask = "S";
    do {
        let theTask = '';
        while (!theTask || Number(theTask) || theTask == '') {
            theTask = prompt("Ingrese Id de tarea a marcar como finalizada")
        }
        task.completeTask(theTask);
        anotherTask = prompt("Ingrese la letra N cuando no desee finalizar mas tareas");

    } while (anotherTask != "N");

});

const modify_plan = document.getElementById('modifyPlan');

modify_plan.addEventListener('click', function () {
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

});

const modify_coworker = document.getElementById('modifyCoworker');

modify_coworker.addEventListener('click', function () {
    let anotherTask = "S";
    do {
        let theTask = '';
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

});

const list_coworkers = document.getElementById('listCoworkers');

list_coworkers.addEventListener('click', function () {

    let theCoworker = "";
    const coworkers = coworker.findAllItems();
    coworkers.forEach(element => {
        theCoworker += `Id ${element.id}: ${element.firstname} ${element.surname} Valor hora ${element.valuePerHour} Cantidad de horas diarias ${element.hoursPerDay}\n`;
    })
    alert(theCoworker);
});

const delete_coworker = document.getElementById('deleteCoworker');

delete_coworker.addEventListener('click', function () {

    const coworkers = coworker.findAllItems();

    let data = [];

    coworkers.forEach(element => {
        data.push({
            id: element.id,
            text: element.firstname + " " + element.surname
        });
    })

    document.getElementById('modalForm').style.display = 'block';

    const selectCoworker = document.getElementById('theForm');

    theForm.innerHTML = `<h2>Baja de colaborador</h2>
                        <select id="selector">
                        </select>`

    const inSelect = document.getElementById('selector');

    data.forEach(element => {
        let myOption = element.id + " " + element.text;
        console.log(myOption);
        const theOption = document.createElement('option');
        theOption.innerHTML = `<option>
                                ${myOption}  
                              </option>`

        inSelect.appendChild(theOption);
    });

    const theButton = document.createElement('div')
    theButton.innerHTML = `<p id="isAssigned" class="isRed"><p>
                            <button type="submit" id="boton" class="btn btn-oval btn-primary">
                                Enviar
                            </button>
                           </div>`

    selectCoworker.appendChild(theButton)

    selectCoworker.addEventListener('submit', () => {

        const idCoworker = document.getElementById('selector');

        const theId = idCoworker.value.substr(0, 4);

        const myTasks = task.findAllItems();

        let coworkerAssigned = false;

        for (element of myTasks) {
            if (theId == element.assignedTo) {
                coworkerAssigned = true;
            }
        }

        if (coworkerAssigned) {

            let theComment = "El colaborador esta asignado a una tarea. Podra darlo de baja despues de asignar otro colaborados a la misma "

            document.getElementById('isAssigned').innerHTML = theComment;

        } else {
            coworker.deleteItem(theId);
        }

        formCoworker.reset();
    })

});

const new_coworker = document.getElementById('newCoworkerForm')

new_coworker.addEventListener('click', function () {
    const coworkers = coworker.findAllItems();
    let i = coworkers.length;
    let theId = coworkers[i - 1].id.substr(1);
    let resultado = +theId + 1;
    resultado = resultado.toString();
    theId = resultado.trim();
    console.log(theId);
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
    let id = theId;

    document.getElementById('coworker').style.display = 'block';

    formCoworker.addEventListener('submit', function () {
        
        const formCoworker = document.getElementById('formCoworker');
        const apellido = document.getElementById('surname');
        const nombre = document.getElementById('firstname');
        const valorHora = document.getElementById('valuePerHour');
        const horasDia = document.getElementById('hoursPerDay');

        const surname = apellido.value;
        const firstname = nombre.value;
        const valuePerHour = valorHora.value;
        const hoursPerDay = horasDia.value;

        const colaboradorNuevo = { id: id, surname: surname, firstname: firstname, valuePerHour: valuePerHour, hoursPerDay: hoursPerDay };

        coworker.createItem(colaboradorNuevo);

        formCoworker.reset();

    });

});



