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
                            let nombre = prompt("Por favor ingrese el Nombre del responsable asignado");
                            while (!nombre || Number(nombre) || nombre == '') {
                                alert("Es obligtorio ingresar un nombre no nulo");
                                nombre = prompt("Por favor ingrese el Nombre del responsable asignado");
                            }
                            alert("Se ha asignado la tarea " + theTask + " a " + nombre);
                            document.getElementById(responsable).innerHTML = nombre;
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
                            while (!dias || Number(dias) <0) {
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
