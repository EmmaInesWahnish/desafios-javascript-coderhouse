class Task {
    constructor(id, description, assignedTo, state, workDays, tagname) {
        this.id = id;
        this.description = description;
        this.assignedTo = assignedTo;
        this.state = state;
        this.workDays = workDays;
        this.tagname = tagname;
    }

    //method

    showTasks() {
        for (var j = 0; j < 5; j++) {
            let theId = this.tagname + "C0" + j;
            switch (j) {
                case 0:
                    document.getElementById(theId).innerHTML = this.id;
                    break;
                case 1:
                    document.getElementById(theId).innerHTML = this.description;
                    break;
                case 2:
                    document.getElementById(theId).innerHTML = this.assignedTo;
                    break;
                case 3:
                    document.getElementById(theId).innerHTML = this.state;
                    break;
                case 4:
                    document.getElementById(theId).innerHTML = this.workDays;
                    break;
                default:
                    document.getElementById(theId).innerHTML = '';
            }
        }
    }
}

let tasks = [];

tasks[0] = new Task("T000", "Relevamiento de requerimientos", "W000", "No", 2, "F00");
tasks[1] = new Task("T001", "Diagrama de funcionalidad", "W001", "No", 5, "F01");
tasks[2] = new Task("T002", "Validacion del diagrama", "W000", "No", 1, "F02");
tasks[3] = new Task("T003", "Desarrollo de la aplicacion", "W003", "No", 15, "F03");
tasks[4] = new Task("T004", "Testing de la aplicacion", "W002", "No", 5, "F04");
tasks[5] = new Task("T005", "Puesta en produccion", "W001", "No", 2, "F05");

function showPlan() {
    for (var i = 0; i < tasks.length; i++) {
        tasks[i].showTasks();
    }
}

function percentComplete() {
    let total = 0;
    let totalDias = 0;
    let cantidadTotalTareas = 6;
    for (i = 0; i < cantidadTotalTareas; i++) {
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

function modifyPlan() {
    let option = 0;
    do {
        option = +prompt("Modificar: 1-Responsable 2-Dias trabajados 3-Salir");
        let anotherTask = "S";
        let responsable = '';
        let losDias = '';
        if (Number(option) <= 0 || Number(option) > 3) {
            alert("Debe seleccionar una opcion valida");
        } else {
            switch (option) {
                case 1:
                    do {
                        theTask = '';
                        while (!theTask || Number(theTask) || theTask == '') {
                            theTask = prompt("Ingrese Id de tarea a asignar")
                        }
                        taskExists = false;
                        let taskId = '';
                        for (i = 0; i < 6; i++) {
                            let theId = "F0" + i + "C00";
                            taskId = document.getElementById(theId).innerHTML;
                            if (taskId === theTask) {
                                taskExists = true;
                                responsable = "F0" + i + "C02";
                            }
                        }
                        if (taskExists) {
                            let nombre = prompt("Por favor ingrese el Id del responsable asignado");
                            while (!nombre || Number(nombre) || nombre == '') {
                                alert("Es obligtorio ingresar un Id no nulo");
                                nombre = prompt("Por favor ingrese el Id del responsable asignado");
                            }
                            result = coworkers.find(coworker => coworker.id == nombre);
                            if (result != null) {
                                document.getElementById(responsable).innerHTML = nombre;
                                alert("Se ha asignado la tarea " + theTask + " a " + nombre);
                            } else {
                                alert("Id " + nombre + " inexistente");
                            }
                        }
                        else {
                            alert("No existe una tarea con Id " + theTask + " en el plan");
                        }
                        anotherTask = prompt("Ingrese la letra N cuando no desee asignar mas tareas");
                    } while (anotherTask != "N");
                    break;
                case 2:
                    do {
                        theTask = '';
                        while (!theTask || Number(theTask) || theTask == '') {
                            theTask = prompt("Ingrese Id de tarea")
                        }
                        taskExists = false;
                        let taskId = '';
                        for (i = 0; i < 6; i++) {
                            let theId = "F0" + i + "C00";
                            taskId = document.getElementById(theId).innerHTML;
                            if (taskId === theTask) {
                                taskExists = true;
                                losDias = "F0" + i + "C04";
                            }
                        }
                        if (taskExists) {
                            let dias = +prompt("Por favor ingrese la cantidad de dias trabajados");
                            while (!dias || Number(dias) < 0) {
                                alert("La cantidad de días debe ser un numero positivo");
                                dias = prompt("Por favor ingrese la cantidad de dias trabajados");
                            }
                            alert("Se ha modificado la cantidad de dias de la tarea " + theTask + " a " + dias);
                            document.getElementById(losDias).innerHTML = dias;
                        }
                        else {
                            alert("No existe una tarea con Id " + theTask + " en el plan");
                        }
                        anotherTask = prompt("Ingrese la letra N cuando desee finlizar");
                    } while (anotherTask != "N");
                case 3:
                    break;
            }
        }
    } while (Number(option) !== 3);
}
