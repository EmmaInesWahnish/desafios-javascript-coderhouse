function showPlan(){
    let tasks= [];
    let auxArray = ["T000", "Relevamiento de requerimientos", " ","No",2];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T001", "Diagrama de funcionalidad", " ","No",5];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T002", "Validacion del diagrama", " ","No",1];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T003", "Desarrollo de la aplicacion", " ","No",15];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T004", "Testing de la aplicacion", " ","No",5];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T005", "Puesta en produccion", " ","No",2];
    tasks.push(auxArray);
    for (var i=0; i < 6; i++) {
        for (var j=0; j < 5; j++) {
            let theId = "F0" + i +"C0" + j;
            document.getElementById(theId).innerHTML = tasks[i][j];
        }
    }
}
