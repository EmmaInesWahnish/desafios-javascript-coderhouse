export const renderList = (taskId, tasks, letter, arrayOfRowIds) => {

    const $table = $("#" + taskId);

    let i = 0;

    for (const item of tasks) {

        let colId = [];

        let theId = i.toString();

        theId = theId.trim();

        switch (theId.length) {
            case 1:
                theId = letter + "0" + theId;
                break;
            case 2:
                theId = letter + theId;
                break;
            default:
                alert("Id overflow***");
        }

        for (let j = 0; j < 5; j++) {

            colId[j] = theId + "C0" + j;

        }

        //limpiar antes de volver a renderizar
        var $taskContainer = $("#" + theId);

        $taskContainer.remove();

        i++;

        //renderizar
        $table.append(`<tr id=${theId}>
                                <td>
                                    <p id=${colId[0]}> 
                                        ${item.id} 
                                    </p>
                                <td>
                                    <p id= ${colId[1]}> 
                                        ${item.description} 
                                    </p>
                                </td>
                                <td>
                                    <p id=${colId[2]}> 
                                        ${item.assignedTo} 
                                    </p>
                                </td>
                                <td>
                                    <p id=${colId[3]}> 
                                        ${item.state} 
                                    </p>
                                <td>
                                    <p id=${colId[4]}> 
                                        ${item.workDays} 
                                    </p>
                                </td>`)

        $("#" + theId).on('click', function (e) {

            if ($("#" + theId).hasClass("selected")) {
                $("#" + theId).removeClass("selected");
                let rowId = -1;
                for (let i =0; i < arrayOfRowIds.length; i++) {
                    if (arrayOfRowIds[i] == theId) {
                        rowId = i;
                    }
                }
                if (rowId != -1) {
                    arrayOfRowIds.splice(rowId,1); 
                }

            } else {
                $("#" + theId).addClass("selected");
                arrayOfRowIds.push(theId);
            }

        });
    }
}
