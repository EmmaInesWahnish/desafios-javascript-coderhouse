import { fillSelector } from "./fill-selector.js";

import { renderSelector } from "./render-selector.js";

export const coworkerDelete = (coworker, Coworker, task) => {

    let data = [];

    data = fillSelector(Coworker);

    var $span = $("#close_c");
    var $modal = $("#modalC");
    $modal.show();
    $span.on('click', function (e) {
        $('#selector').remove();
        $('#pleaseRemove').remove();
        $("#submitButton").remove();
        $modal.hide();
    });

    window.onclick = function (event) {
        if (event.target == $modal) {
            $('#selector').remove();
            $('#pleaseRemove').remove();
            $("#submitButton").remove();
            $modal.hide();
        }
    }

    const $selectCoworker = $('#theFormC');

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

        try {
            var theId = $idCoworker[0].value;
        }
        catch (e) { }

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

            $('#selector').remove();
            
            $('#pleaseRemove').remove();

            $("#submitButton").remove();

            $('#modalC').hide();

            alert(theComment);

            coworkerAssigned = false;

        } else {
            coworker.deleteItem(theId);

            $('#selector').remove();

            $('#pleaseRemove').remove();

            $("#submitButton").remove();

            $('#modalC').hide();

        }
    })

}
