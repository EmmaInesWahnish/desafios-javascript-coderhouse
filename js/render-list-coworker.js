export const renderListCoworker = (taskId, tasks, letter) => {

    const $tasksContainer = $("#" + taskId)

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

        i++;

        $tasksContainer.append(`<tr>
                                <td>
                                    <p id=${colId[0]}> 
                                        ${item.id} 
                                    </p>
                                </td>    
                                <td>
                                    <p id= ${colId[1]}> 
                                        ${item.surname} 
                                    </p>
                                </td>
                                <td>
                                    <p id=${colId[2]}> 
                                        ${item.firstname} 
                                    </p>
                                </td>
                                <td>
                                    <p id=${colId[3]}> 
                                        ${item.valuePerHour} 
                                    </p>
                                </td>    
                                <td>
                                    <p id=${colId[4]}> 
                                        ${item.hoursPerDay} 
                                    </p>
                                </td>`);
    }

}
