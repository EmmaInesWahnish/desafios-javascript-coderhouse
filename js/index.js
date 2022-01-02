import { Task } from "./task.js";

import { Coworker } from "./coworker.js";

import { renderList } from "./render-list.js";

import { renderListCoworker } from "./render-list-coworker.js";

import { fillSelector } from "./fill-selector.js";

import { renderSelector } from "./render-selector.js";

//modulo principal
localStorage.clear();

//variable indicadora dropdown de plan habilitado o deshabilitado
let navbardrop02On = true;

//datos iniciales que se cargaran en local storage
const tareas = [
    { id: "T000", description: "Relevamiento de requerimientos", assignedTo: "W000", state: "No", workDays: 2 },
    { id: "T001", description: "Diagrama de funcionalidad", assignedTo: "W001", state: "No", workDays: 5 },
    { id: "T002", description: "Validacion del diagrama", assignedTo: "W000", state: "No", workDays: 1 },
    { id: "T003", description: "Desarrollo de la aplicacion", assignedTo: "W003", state: "No", workDays: 15 },
    { id: "T004", description: "Testing de la aplicacion", assignedTo: "W002", state: "No", workDays: 5 },
    { id: "T005", description: "Puesta en produccion", assignedTo: "W001", state: "No", workDays: 2 },
]

const colaboradores = [
    { id: "W000", surname: "Figueroa", firstname: "Hernan", valuePerHour: 20, hoursPerDay: 4 },
    { id: "W001", surname: "Arias", firstname: "Eduardo", valuePerHour: 18, hoursPerDay: 5 },
    { id: "W002", surname: "Perez", firstname: "Valeria", valuePerHour: 22, hoursPerDay: 6 },
    { id: "W003", surname: "Rodriguez", firstname: "Fernando", valuePerHour: 19, hoursPerDay: 6 },
    { id: "W004", surname: "Zucker", firstname: "Patricia", valuePerHour: 20, hoursPerDay: 5 },
    { id: "W005", surname: "Wella", firstname: "German", valuePerHour: 20, hoursPerDay: 5 },
]

//Inicio carga de tareas 
const task = new Task();

let element = {};

let elem = {};

for (element of tareas) {
    task.createItem(element);
}

const tasks = task.findAllItems();

const tasksTable = "tasks-table";

const letra = "F";

renderList(tasksTable, tasks, letra);
//fin carga de tareas

//Inicio carga de colaboradores
const coworker = new Coworker;

for (elem of colaboradores) {
    coworker.createItem(elem);
}
//fin carga de colaboradores

//bloque para calcular el avance del plan
const porcentaje = document.getElementById('percentComplete')

porcentaje.addEventListener('click', function () {
    let resultado = Number(task.tasksPercentCompletion()) + " %";
    document.getElementById("avance").innerHTML = resultado;
})
//Fin bloque para calcular el avance del plan

//bloque para calcular costo del plan
const costo = document.getElementById('calculateCost')

costo.addEventListener('click', function () {
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
    document.getElementById("costo").innerHTML = resultado;
});
//fin bloque para calcular costo del plan

//bloque para modificar el estado de una tarea
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
//fin bloque para modificar el estado de una tarea

//bloque para modificar la cantidad de dias de una tarea
const modify_plan = document.getElementById('modifyPlan');

modify_plan.addEventListener('click', function () {
    let anotherTask = "S";
    do {
        let theTask = '';
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
//fin bloque para modificar la cantidad de dias de una tarea

const modify_coworker = document.getElementById('modifyCoworkerInPLan');

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

    document.getElementById('modalForm').style.display = 'block';

    const selectCoworker = document.getElementById('theForm');

    selectCoworker.innerHTML = `<h2>Lista de colaboradores</h2>
                    <table id="coworkers-table" class="table table-bordered">
                        <tr>
                            <th>Id</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Valor hora</th>
                            <th>Horas diarias</th>
                        </tr>
                    </table>`

    const coworkers = coworker.findAllItems();

    let coworkersTable = "coworkers-table";

    let letter = "R";

    renderListCoworker(coworkersTable, coworkers, letter);

});

const delete_coworker = document.getElementById('deleteCoworker');

delete_coworker.addEventListener('click', function () {

    let data = [];

    data = fillSelector(data, Coworker);

    document.getElementById('modalForm').style.display = 'block';

    const selectCoworker = document.getElementById('theForm');

    theForm.innerHTML = `<h2>Baja de colaborador</h2>
                        <select id="selector">
                        </select>`

    const inSelect = document.getElementById('selector');

    renderSelector(data, inSelect);

    const theButton = document.createElement('div');

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

            let theComment = "El colaborador esta asignado a una tarea. Podra darlo de baja despues de asignar otro colaborador a la misma "

            document.getElementById('isAssigned').innerHTML = theComment;

        } else {
            coworker.deleteItem(theId);
        }

        selectCoworker.reset();
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

const delete_task = document.getElementById('deleteTask');

delete_task.addEventListener('click', function () {

    let data = [];

    data = fillSelector(data, Task);

    document.getElementById('modalForm').style.display = 'block';

    const selectTask = document.getElementById('theForm');

    theForm.innerHTML = `<h2>Eliminacion de Tarea</h2>
                        <select id="selector">
                        </select>`

    const inSelect = document.getElementById('selector');

    renderSelector(data, inSelect);

    const theButton = document.createElement('div');

    theButton.innerHTML = `<button type="submit" id="boton" class="btn btn-oval btn-primary">
                                Enviar
                            </button>
                           </div>`

    selectTask.appendChild(theButton);

    selectTask.addEventListener('submit', () => {

        const idTask = document.getElementById('selector');

        const theId = idTask.value.substr(0, 4);

        task.deleteItem(theId);

        document.getElementById(theId).remove();

        selectTask.reset();
    })

});

const new_task = document.getElementById('newTask');

new_task.addEventListener('click', function () {
    let navbardrop02 = document.getElementById('navbardrop02');
    navbardrop02On = false;
    navbardrop02.disabled = true;
    let tasks = task.findAllItems();
    let theId = [];
    let i = tasks.length;
    let iSearch = i;
    if (!i) i = 0;
    if (i > 0) {
        iSearch = (Number(tasks[i - 1].id.substr(1)) + 1).toString().trim();
    } else {
        iSearch = i + '';
    }
    theId[i] = "T" + iSearch.padStart(3, '0');
    var theTaskContainer = document.getElementById('tasks-table');
    var theTaskRow = document.createElement('tr');
    theTaskRow.setAttribute('id', theId[i]);
    theTaskRow.innerHTML = `<td>
        <input type='hidden' id=${theId[i] + "C0"}  value='${theId[i]}'>
        <p>
            ${theId[i]}
        </p>
    </td>
    <td>
        <input id=${theId[i] + "C1"} autocomplete="off" type="text">
    </td>
    <td>
        <select class="js-example-basic-single" name="coworker option" id="selector">
        </select>
    </td>
    <td>
    <select class="js-example-basic-single" name="yes no option" id=${theId[i] + "C3"}>
        <option value="Si">Si</option>
        <option value="No">No</option>
    </select>
    </td>
    <td>
        <input id=${theId[i] + "C4"} autocomplete="off" type="number">
    </td>
    <td>
        <button id=${theId[i] + "C5"} class="btn btn-oval btn-xs btn-success ph-sm mt-sm"><em class="fa fa-plus ml-sm"></em> Add</button>
    </td>
    <td>
        <button id=${theId[i] + "C6"} class="btn btn-oval btn-xs btn-secondary ph-sm mt-sm"></em>Cancel</button>
    </td>`;

    theTaskContainer.appendChild(theTaskRow);

    let data = [];

    data = fillSelector(data, Coworker);

    const inSelect = document.getElementById('selector');

    renderSelector(data, inSelect);

    document.getElementById(theId[i] + "C5").addEventListener('click', function () {

        const identificacion = document.getElementById(theId[i] + "C0");
        const descripcion = document.getElementById(theId[i] + "C1");
        const colaborador = document.getElementById('selector');
        const estado = document.getElementById(theId[i] + "C3");
        const horas = document.getElementById(theId[i] + "C4");

        const id = identificacion.value;
        const description = descripcion.value;
        const assignedTo = colaborador.value;
        const state = estado.value;
        const workDays = horas.value;

        const tareaNueva = { id: id, description: description, assignedTo: assignedTo, state: state, workDays: workDays };

        task.createItem(tareaNueva);

        theTaskContainer.innerHTML = "";

        const tasks = task.findAllItems();

        const tasksTable = "tasks-table"

        const letra = "F"

        navbardrop02On = true;

        navbardrop02.disabled = false;

        renderList(tasksTable, tasks, letra);

    });

    document.getElementById(theId[i] + "C6").addEventListener('click', function () {

        document.getElementById(theId[i]).remove();

        navbardrop02On = true;

        navbardrop02.disabled = false;

    });

});

