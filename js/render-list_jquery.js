export const renderList = (tableId, tasks, letter) => {

    const $table = $("#" + taskId);

    the

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

            var $taskContainer = $("#" + theId);

            $taskContainer.remove();

            colId[j] = theId + "C0" + j;

        }

        $taskContainer.remove();

        colId[j] = theId + "C0" + j;

        i++;

        $table.innerHTML.append(`<tr id=${theId}>
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
    }

}
