function showPlan(){
    let tasks= [];
    let auxArray = ["T000", "Relevamiento de requerimientos", " ","No"];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T001", "Diagrama de funcionalidad", " ","No"];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T002", "Validacion del diagrama", " ","No"];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T003", "Desarrollo de la aplicacion", " ","No"];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T004", "Testing de la aplicacion", " ","No"];
    tasks.push(auxArray);
    auxArray = [];
    auxArray = ["T005", "Puesta en produccion", " ","No"];
    tasks.push(auxArray);
    for (var i=0; i < 6; i++) {
        for (var j=0; j < 4; j++) {
            let theId = "F0" + i +"C0" + j;
            document.getElementById(theId).innerHTML = tasks[i][j];
        }
    }
}
