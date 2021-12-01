function asignTask() {
    let anotherTask = "S";
    let responsable = '';
    do {
        theTask = '';
        while (!theTask || Number(theTask) || theTask == '') {
            theTask = prompt("Ingrese Id de tarea a asignar")
        }
        taskExists = false;
        let taskId = '';
        for (i=0; i < 6; i++) {
            let theId = "F0" + i +"C00";
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
        else  {
            alert("No existe una tarea con Id " + theTask + " en el plan");
        }
        anotherTask = prompt ("Ingrese la letra N cuando no desee asignar mas tareas");
        
    } while (anotherTask != "N");

}