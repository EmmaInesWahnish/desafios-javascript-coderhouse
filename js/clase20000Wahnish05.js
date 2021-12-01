function changeTaskStatus() {
    let anotherTask = "S";
    do {
        theTask = '';
        while (!theTask || Number(theTask) || theTask == '') {
            theTask = prompt("Ingrese Id de tarea a marcar como finalizada")
        }
        taskExists = false;
        let taskId = '';
        for (i=0; i < 6; i++) {
            let theId = "F0" + i +"C00";
            let estado = "F0" + i + "C03";
            taskId = document.getElementById(theId).innerHTML;
            if (taskId === theTask) {
                taskExists = true;
                document.getElementById(estado).innerHTML = "Si"                
            }
        }
        if (taskExists) {
            alert("Se ha finalizado la tarea " + theTask);
        } 
        else  {
            alert("No existe una tarea con Id " + theTask + " en el plan");
        }
        anotherTask = prompt ("Ingrese la letra N cuando no desee finalizar mas tareas");
        
    } while (anotherTask != "N");

}