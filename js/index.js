import { Task } from "./task.js";

import { Coworker } from "./coworker.js";

import { renderList } from "./render-list.js";

import { renderListCoworker } from "./render-list-coworker.js";

import { renderListBudget } from "./render-list-budget.js";

import { fillSelector } from "./fill-selector.js";

import { renderSelector } from "./render-selector.js";

import { removeSelection } from "./remove-one-row-selection.js"

//JSON estaticos donde estan los datos para la carga inicial
const URL_JSON_TAREAS = '../db/tareas.json';
const URL_JSON_COLABORADORES = '../db/colaboradores.json';
const URL_FOR_POST = 'https://jsonplaceholder.typicode.com/posts';
localStorage.clear();

//variables globales
let navbardrop02On = true;
let selectedTasks = [];
let costoDelPlan = 0;

//datos iniciales se cargan en locaStorage

//Inicio carga de tareas 
const task = new Task();
let tareas = [];
$.getJSON(URL_JSON_TAREAS, function (response, status) {
    if (status === "success") {
        tareas = response;
        let element = {};
        for (element of tareas) {
            task.createItem(element);
        }
        const tasks = task.findAllItems();
        const tasksTable = "tasks-table";
        const letra = "F";
        renderList(tasksTable, tasks, letra, selectedTasks);
    };
});
//fin carga de tareas

//Inicio carga de colaboradores
const coworker = new Coworker;
let colaboradores = [];
$.getJSON(URL_JSON_COLABORADORES, function (response, status) {
    if (status === "success") {
        colaboradores = response;
        let elem = {};
        for (elem of colaboradores) {
            coworker.createItem(elem);
        }
    };
});
//fin carga de colaboradores

//bloque para calcular el avance del plan
const $porcentaje = $('#percentComplete')

$porcentaje.on('click', function () {
    let resultado = Number(task.tasksPercentCompletion()) + " %";
    $('#avance').empty();
    $("#avance").append(resultado);
})
//Fin bloque para calcular el avance del plan

//bloque para calcular costo del plan
const $costo = $('#calculateCost')

$costo.on('click', function () {
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
    $('#costo').empty();
    $('#costo').append(resultado);
});
//fin bloque para calcular costo del plan

//bloque para listar colaboradores
const $list_coworkers = $('#listCoworkers');

$list_coworkers.on('click', function () {

    var $span = $("#close_generic");
    var $modal = $("#modalForm");
    $modal.show();
    $span.on('click', function (e) {
        $('#pleaseRemove').remove();
        $modal.hide();
    });

    window.onclick = function (event) {
        if (event.target == $modal) {
            $('#pleaseRemove').remove();
            $modal.hide();
        }
    }

    $('#modalForm').show();

    const $selectCoworker = $("#theForm");

    $selectCoworker.append(`<div id="pleaseRemove">
                    <h2>Lista de colaboradores</h2>
                    <table id="coworkers-table" class="table table-bordered">
                        <tr>
                            <th>Id</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Valor hora</th>
                            <th>Horas diarias</th>
                        </tr>
                    </table>
                </div>`);

    const coworkers = coworker.findAllItems();

    let coworkersTable = "coworkers-table";

    let letter = "R";

    renderListCoworker(coworkersTable, coworkers, letter);

});
//Fin bloque para listar colaboradores

//bloque para dar la baja a un colaborador
const $delete_coworker = $('#deleteCoworker');

$delete_coworker.on('click', function () {

    let data = [];

    data = fillSelector(data, Coworker);

    var $span = $("#close_generic");
    var $modal = $("#modalForm");
    $modal.show();
    $span.on('click', function (e) {
        $('#pleaseRemove').remove();
        $("#submitButton").remove();
        $modal.hide();
    });

    window.onclick = function (event) {
        if (event.target == $modal) {
            $('#pleaseRemove').remove();
            $("#submitButton").remove();
            $modal.hide();
        }
    }

    const $selectCoworker = $('#theForm');

    $selectCoworker.append(`<div id="pleaseRemove">
                        <h2>Baja de colaborador</h2>
                        <select id="selector">
                        </select>
                    </div>`);

    var $inSelect = $("#selector");

    renderSelector(data, $inSelect);

    $selectCoworker.append(`<div id="submitButton">
                                <p id="isAssigned" class="isRed"><p>
                                    <button type="submit" id="boton" class="btn btn-oval btn-primary">
                                        Enviar
                                    </button>
                            </div>`);

    $selectCoworker.on('submit', () => {

        const $idCoworker = $('#selector');

        const theId = $idCoworker[0].value.substr(0, 4);

        const myTasks = task.findAllItems();

        let coworkerAssigned = false;

        let element = '';

        for (element of myTasks) {
            if (theId == element.assignedTo) {
                coworkerAssigned = true;
            }
        }

        if (coworkerAssigned) {

            let theComment = "El colaborador esta asignado a una tarea. Podra darlo de baja despues de asignar otro colaborador a la misma "

            $('#isAssigned').append(theComment);

        } else {
            coworker.deleteItem(theId);
        }
        $('#pleaseRemove').remove();

        $("#submitButton").remove();

        $span.trigger('click');

        $('#modalForm').hide();
    })

});
//fin bloque para dar de baja un colaborador

//bloque para dar de alta un colaborador
const $new_coworker = $('#newCoworkerForm');

$new_coworker.on('click', function () {
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
    var $span = $("#close_coworker");
    var $modal = $("#coworker");
    $modal.show();
    $span.on('click', function () {
        $modal.hide();
    })
    window.onclick = function (event) {
        if (event.target == modal) {
            $modal.hide();
        }
    }

    $('#coworker').on('submit', function () {

        const apellido = $('#surname');
        const nombre = $('#firstname');
        const valorHora = $('#valuePerHour');
        const horasDia = $('#hoursPerDay');

        const surname = apellido[0].value;
        const firstname = nombre[0].value;
        const valuePerHour = valorHora[0].value;
        const hoursPerDay = horasDia[0].value;

        const colaboradorNuevo = { id: id, surname: surname, firstname: firstname, valuePerHour: valuePerHour, hoursPerDay: hoursPerDay };

        coworker.createItem(colaboradorNuevo);

        $('#coworker').hide();

    });

});
//fin de bloque para dar de alta un colaborador

//bloque para eliminar una tarea
$('#deleteTask').on('click', function (e) {

    let data = [];

    data = fillSelector(data, Task);

    var $span = $("#close_generic");
    var $modal = $("#modalForm");
    $modal.show();
    $span.on('click', function (e) {
        $('#pleaseRemove').remove();
        $("#submitButton").remove();
        $modal.hide();
    });

    window.onclick = function (event) {
        if (event.target == $modal) {
            $('#pleaseRemove').remove();
            $("#submitButton").remove();
            $modal.hide();
        }
    }

    var $selectTask = $('#theForm');

    $selectTask.append(`<div id="pleaseRemove">
                        <h2>Eliminacion de Tarea</h2>
                        <select id="selector">
                        </select>
                    </div>`);

    var $inSelect = $("#selector");

    renderSelector(data, $inSelect);

    $selectTask.append(`<div id="submitButton">
                            <button type="submit" id="boton" class="btn btn-oval btn-primary">
                                Enviar
                            </button>
                        </div>`)

    $selectTask.on('submit', () => {

        var $idTask = $('#selector');

        const theId = $idTask[0].value.substr(0, 4);

        const rowId = "F" + $idTask[0].value.substr(2, 2);

        alert(rowId);

        task.deleteItem(theId);

        $("#" + rowId).remove();

        $('#pleaseRemove').remove();

        $("#submitButton").remove();

        $('#modalForm').hide();
    })

});
//fin bloque para eliminar una tarea

//bloque para dar de alta una tarea
$('#newTask').on('click', function () {
    let navbardrop02 = $('#navbardrop02');
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
    var $theTaskContainer = $("#tasks-table");
    $theTaskContainer.append(`<tr id=${theId[i]}>
    <td>
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
    </td>
    </tr>`);

    let data = [];

    data = fillSelector(data, Coworker);

    var $inSelect = $("#selector");

    renderSelector(data, $inSelect);

    $("#" + theId[i] + "C5").on('click', function (e) {

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

        $("#" + theId[i]).remove();

        const tasks = task.findAllItems();

        const tasksTable = "tasks-table"

        const letra = "F"

        navbardrop02On = true;

        navbardrop02.disabled = false;

        renderList(tasksTable, tasks, letra, selectedTasks);

    });

    $("#" + theId[i] + "C6").on('click', function (e) {

        $("#" + theId[i]).remove();

        navbardrop02On = true;

        navbardrop02.disabled = false;

    });

});
//fin bloque para dar de alta una tarea

//Modificacion de colaborador en filas seleccionadas
$('#modifySelected').on('click', function () {
    let data = [];

    data = fillSelector(data, Coworker);

    var $span = $("#close_generic");
    var $modal = $("#modalForm");
    $modal.show();
    $span.on('click', function (e) {
        $('#pleaseRemove').remove();
        $("#submitButton").remove();
        $modal.hide();
    });

    window.onclick = function (event) {
        if (event.target == $modal) {
            $('#pleaseRemove').remove();
            $("#submitButton").remove();
            $modal.hide();
        }
    }

    const $selectCoworker = $('#theForm');

    $selectCoworker.append(`<div id="pleaseRemove"
                        <h2>Modificacion de colaborador</h2>
                        <select id="selector">
                        </select>
                    </div>`);

    var $inSelect = $("#selector");

    renderSelector(data, $inSelect);

    $selectCoworker.append(`<div id="submitButton">
                            <button type="submit" id="boton" class="btn btn-oval btn-primary">
                                Enviar
                            </button>
                        </div>`)

    $selectCoworker.on('submit', () => {

        let element = '';

        let idColaborador = $('#selector').val();

        for (element of selectedTasks) {

            let theTask = "T0" + element.substring(1);

            task.updateCoworker(theTask, idColaborador);

        }
        $('#pleaseRemove').remove();

        $("#submitButton").remove();

        $('#modalForm').hide();
    })

});
//Fin modificacion colaborador en filas seleccionadas

//Modificacion tarea finalizada en filas seleccionadas
$('#changeTaskStatus').on('click', function () {

    let element = '';

    for (element of selectedTasks) {

        let theTask = "T0" + element.substring(1);

        console.log(theTask);

        task.completeTask(theTask);

    }

})
//Fin modificacion tarea finalizada en filas seleccionadas

//Modificacion de dias trabajados
$('#modifyDays').on('click', function () {

    var $span = $("#close_days");
    var $modal = $("#modalFormDias");
    $modal.show();
    $span.on('click', function (e) {
        $('#cantidadDias').remove();
        $("#mod-dias").remove();
        $('#pleaseRemove').remove();
        $("#submitButton").remove();
        $modal.hide();
    });

    window.onclick = function (event) {
        if (event.target == $modal) {
            $('#cantidadDias').remove();
            $("#mod-dias").remove();
            $('#pleaseRemove').remove();
            $("#submitButton").remove();
            $modal.hide();
        }
    }

    const $changeDays = $('#daysForm');

    $changeDays.append(`<div id="pleaseRemove"
                        <h2>Modificacion de dias de trabajo</h2>
                        <div id="mod-dias">
                            <label for="cantidadDias">Cantidad de dias</label>
                            <input id="cantidadDias" autocomplete="off" type="number">
                        </div>
                    </div>`);

    $changeDays.append(`<div id="submitButton">
                            <button type="submit" id="boton" class="btn btn-oval btn-primary">
                                Enviar
                            </button>
                        </div>`)

    $changeDays.on('submit', () => {

        let element = '';

        let dias = Number($('#cantidadDias').val());

        if (dias < 0) {
            alert("La cantidad de dias debe ser un numero positivo")
        } else {

            for (element of selectedTasks) {

                let theTask = "T0" + element.substring(1);

                task.updateWorkDays(theTask, dias);

            }
        }
        $('#cantidadDias').remove();

        $("#mod-dias").remove();

        $('#pleaseRemove').remove();

        $("#submitButton").remove();

        $('#modalFormDias').hide();
    })

});
//Fin modificacion dias trabajados

//bloque para listar presupuesto
const $list_budget = $('#displayBudget');

$list_budget.on('click', function () {

    var $span = $("#close_generic");
    var $modal = $("#modalForm");
    $modal.show();
    $span.on('click', function (e) {
        $('#pleaseRemove').remove();
        $('#pleaseRemove2').remove();
        $('#submitBudget').remove();
        $modal.hide();
    });

    window.onclick = function (event) {
        if (event.target == $modal) {
            $('#pleaseRemove').remove();
            $('#pleaseRemove2').remove();
            $('#submitBudget').remove();
            $modal.hide();
        }
    }

    const $selectBudget = $("#theForm");

    $selectBudget.append(`<div id="pleaseRemove">
                    <h2>Presupuesto</h2>
                    <table id="budget-table" class="table table-bordered">
                        <tr>
                            <th>Id</th>
                            <th>Descripcion</th>
                            <th>Dias de Trabajo</th>
                            <th>Costo</th>
                        </tr>
                    </table>
                </div>`);

    const tasksForBudget = task.findAllItems();

    let budgetTable = "budget-table";

    let letter = "F";

    var sendTable = renderListBudget(budgetTable, tasksForBudget, letter);

    costoDelPlan = 0;

    let element = 0;

    for (element of sendTable) {
        costoDelPlan = costoDelPlan + Number(element.costo);
    }

    $selectBudget.append(`<div id="pleaseRemove2">
                            <h4>Total U$S:   ${costoDelPlan}</h4>
                        </div>`);

    $selectBudget.append(`<div id="submitBudget">
                        <button type="submit" id="btn-budget" class="btn btn-oval btn-primary">
                            Enviar
                        </button>
                    </div>`)

    $selectBudget.on('submit', () => {
        const myPost = JSON.stringify(sendTable);
        $.ajax({
            method: "POST",
            url: URL_FOR_POST,
            data: myPost,
            success: function (response) {
                let myResult = response;
                console.log(myResult);
                alert("El envio se realizo correctamente");
            }
        })
    })
});
//Fin bloque para listar presupuesto
