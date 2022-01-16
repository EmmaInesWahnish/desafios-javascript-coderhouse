export function removeSelection(arrayOfRowIds, theId) {
    //remueve seleccion   
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

}