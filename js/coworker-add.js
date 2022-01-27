export const addCoworker = (coworker) => {

    const coworkers = coworker.findAllItems();
    let i = coworkers.length;
    let theId = coworkers[i - 1].id.substr(1);

    let resultado = +theId + 1;
    resultado = resultado.toString();
    theId = resultado.trim();
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

    var $span = $("#close_coworker");
    var $modal = $("#coworker");
    $modal.show();
    $span.on('click', function () {
        $modal.hide();
    })
    window.onclick = function (event) {
        if (event.target == $modal) {
            $modal.hide();
        }
    }

    $('#coworker').off('submit').on('submit', function () {
        let id = theId;
        const apellido = $('#surname');
        const nombre = $('#firstname');
        const valorHora = $('#valuePerHour');
        const horasDia = $('#hoursPerDay');

        const surname = apellido[0].value;
        const firstname = nombre[0].value;
        const valuePerHour = valorHora[0].value;
        const hoursPerDay = horasDia[0].value;

        var colaboradorNuevo = { id: id, surname: surname, firstname: firstname, valuePerHour: valuePerHour, hoursPerDay: hoursPerDay };

        coworker.createItem(colaboradorNuevo);

        $("#boton02").trigger("click");

        $('#coworker').hide();

    });

}
