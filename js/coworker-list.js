import { renderListCoworker } from "./render-list-coworker.js";

export const coworkerList = (coworker) => {

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

}
