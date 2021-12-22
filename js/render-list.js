export const renderList = (taskId, tasks, letter) => {

    const tasksContainer = document.getElementById(taskId)

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

        const itemTask = document.createElement('tr');

        itemTask.innerHTML = `<td>
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
                                </td>`

        tasksContainer.appendChild(itemTask)
    }

}
