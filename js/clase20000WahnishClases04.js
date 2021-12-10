class Coworker {
    constructor(id, surname, firstname, valuePerHour, hoursPerDay) {
        this.id = id;
        this.surname = surname;
        this.firstname = firstname;
        this.valuePerHour = valuePerHour;
        this.hoursPerDay = hoursPerDay;
    }

    // metodos
    getFullName() {
        return this.firstname + " " + this.surname;
    }

    getValuePerDay() {
        return this.hoursPerDay * this.valuePerHour;
    }
}

let coworkers = [];
coworkers[0] = new Coworker("W000", "Figueroa", "Hernan", 20, 4);
coworkers[1] = new Coworker("W001", "Arias", "Eduardo", 18, 5);
coworkers[2] = new Coworker("W002", "Perez", "Valeria", 22, 6);
coworkers[3] = new Coworker("W003", "Rodriguez", "Ernesto", 19, 6);
coworkers[4] = new Coworker("W004", "Sutter", "Marcela", 20, 5);
coworkers[5] = new Coworker("W005", "Parodi", "Jorge", 20, 2);

function listCoworkers() {

    let theCoworker = "";
    coworkers.forEach(element => {
        theCoworker += `Id ${element.id}: ${element.firstname} ${element.surname} Valor hora ${element.valuePerHour} Cantidad de horas diarias ${element.hoursPerDay}\n`;
    })
    alert(theCoworker);
}

function calculateCost() {
    let costoDelPlan = 0;
    let cantidadTotalTareas = 6;
    for (i = 0; i < cantidadTotalTareas; i++) {
        let estado = "F0" + i + "C03";
        let losDias = "F0" + i + "C04";
        let elResponsable = "F0" + i + "C02";
        if (document.getElementById(elResponsable).innerHTML != '') {
            let j = Number(document.getElementById(elResponsable).innerHTML.substring(1));
            costoDelPlan = costoDelPlan + Number(document.getElementById(losDias).innerHTML) * coworkers[j].getValuePerDay();
        }
    }
    alert("El costo del proyecto es de " + "U$S " + costoDelPlan);
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
        taskExists = false;
        let taskId = '';
        for (i = 0; i < 6; i++) {
            let theId = "F0" + i + "C00";
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
        else {
            alert("No existe una tarea con Id " + theTask + " en el plan");
        }
        anotherTask = prompt("Ingrese la letra N cuando no desee finalizar mas tareas");

    } while (anotherTask != "N");

}

function newCoworker() {
    let i = coworkers.length;
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
    let auxArray = [];
    auxArray[0] = theId;
    auxArray[1] = prompt("Ingrese el Apellido del colaborador");
    // Se valida la información ingresada
    while (!auxArray[1] || Number(auxArray[1]) || auxArray[1] == '') {
        alert("Es obligtorio ingresar un apellido no nulo");
        auxArray[1] = prompt("Ingrese el Apellido del colaborador");
    }
    auxArray[2] = prompt("Ingrese el Nombre del colaborador");
    // Se valida la información ingresada
    while (!auxArray[2] || Number(auxArray[2]) || auxArray[2] == '') {
        alert("Es obligtorio ingresar un nombre no nulo");
        auxArray[2] = prompt("Ingrese el Nombre del colaborador");
    }
    // Se asume que se pacto un valor hora de 17 U$S
    auxArray[3] = 15;
    // Se asume que se trabajan 6 horas diarias
    auxArray[4] = 6;
    coworkers[i] = new Coworker(auxArray[0], auxArray[1], auxArray[2], auxArray[3], auxArray[4]);
}
