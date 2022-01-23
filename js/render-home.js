import { renderList } from "./render-list.js";

export const renderHome = (task, coworker, selectedTasks) => {

    //JSON estaticos donde estan los datos para la carga inicial
    const URL_JSON_TAREAS = '../db/tareas.json';
    const URL_JSON_COLABORADORES = '../db/colaboradores.json';
    
    //datos iniciales se cargan en locaStorage

    //Inicio carga de tareas 
    $.getJSON(URL_JSON_TAREAS, function (response, status) {
        if (status === "success") {
            var tareas = response;
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
    $.getJSON(URL_JSON_COLABORADORES, function (response, status) {
        if (status === "success") {
            var colaborators = response;
            let elem = {};
            for (elem of colaborators) {
                coworker.createItem(elem);
            }
        };
        return colaborators;
    });
    
    //fin carga de colaboradores
}
